import bcrypt from 'bcryptjs'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import Employee from './models/Employee.js'
import { authenticate } from './middleware/authenticate.js'
import { serializeEmployee } from './utils/employee.js'
import { employees as demoEmployees } from './data/seedEmployees.js'
import { getTaskStatus } from './utils/tasks.js'

dotenv.config()

const app = express()

const clientOrigins = new Set([
  'http://localhost:5173',
  'https://glittery-hotteok-12fa25.netlify.app',
  'https://employeemanagamentsystem-7.onrender.com',
  ...(process.env.CLIENT_ORIGIN ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
])

app.use(cors({
  origin: (origin, callback) => callback(null, !origin || clientOrigins.has(origin))
}))
app.use(express.json({ limit: '100kb' }))
app.use((request, response, next) => {
  request.url = request.url
    .replace(/^\/\.netlify\/functions\/api(?=\/|$)/, '')
    .replace(/^\/api(?=\/|$)/, '') || '/'
  next()
})

const createToken = (employee) => jwt.sign(
  { role: employee.role },
  process.env.JWT_SECRET,
  { subject: employee._id.toString(), expiresIn: '7d' }
)

const respondWithSession = (response, employee, status = 200) =>
  response.status(status).json({
    token: createToken(employee),
    user: {
      id: employee._id.toString(),
      firstName: employee.firstName,
      email: employee.email,
      role: employee.role
    }
  })

const seedDatabase = async () => {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be configured in .env')
  }

  const admin = await Employee.findOne({ role: 'admin' }).select('+password')
  if (!admin) {
    await Employee.create({
      firstName: 'Admin',
      username: adminEmail.split('@')[0],
      email: adminEmail,
      password: await bcrypt.hash(adminPassword, 12),
      role: 'admin'
    })
  } else {
    const credentialsChanged = admin.email !== adminEmail
      || !(await bcrypt.compare(adminPassword, admin.password))

    if (credentialsChanged) {
      admin.email = adminEmail
      admin.username = adminEmail.split('@')[0]
      admin.password = await bcrypt.hash(adminPassword, 12)
      await admin.save()
    }
  }

  const employeeCount = await Employee.countDocuments({ role: 'employee' })
  if (employeeCount === 0) {
    const demoRecords = await Promise.all(demoEmployees.map(async (employee) => ({
      firstName: employee.firstName,
      username: employee.username,
      email: employee.email,
      password: await bcrypt.hash(employee.password, 12),
      role: 'employee',
      tasks: employee.tasks.map((task) => ({
        taskTitle: task.taskTitle,
        taskDescription: task.taskDescription,
        taskDate: task.taskDate,
        category: task.category,
        status: getTaskStatus(task)
      }))
    })))
    await Employee.insertMany(demoRecords)
  }
}

app.get('/health', (request, response) => {
  response.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' })
})

app.post('/auth/register', async (request, response, next) => {
  try {
    const firstName = typeof request.body.firstName === 'string' ? request.body.firstName.trim() : ''
    const email = typeof request.body.email === 'string' ? request.body.email.trim().toLowerCase() : ''
    const password = typeof request.body.password === 'string' ? request.body.password : ''

    if (!firstName || firstName.length > 60 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 6) {
      return response.status(400).json({ message: 'Enter a valid name, email, and password with at least 6 characters' })
    }

    const existingEmployee = await Employee.exists({ email })
    if (existingEmployee) {
      return response.status(409).json({ message: 'An account with this email already exists' })
    }

    const employee = await Employee.create({
      firstName,
      username: email.split('@')[0],
      email,
      password: await bcrypt.hash(password, 12),
      role: 'employee'
    })

    return respondWithSession(response, employee, 201)
  } catch (error) {
    return next(error)
  }
})

app.post('/auth/login', async (request, response, next) => {
  try {
    const email = typeof request.body.email === 'string' ? request.body.email.trim().toLowerCase() : ''
    const password = typeof request.body.password === 'string' ? request.body.password : ''
    const employee = await Employee.findOne({ email }).select('+password')

    if (!employee || !(await bcrypt.compare(password, employee.password))) {
      return response.status(401).json({ message: 'Invalid email or password' })
    }

    return respondWithSession(response, employee)
  } catch (error) {
    return next(error)
  }
})

app.get('/auth/me', authenticate(), async (request, response, next) => {
  try {
    const employee = await Employee.findById(request.auth.id)
    if (!employee) return response.status(401).json({ message: 'Account no longer exists' })
    return response.json({
      id: employee._id.toString(),
      firstName: employee.firstName,
      email: employee.email,
      role: employee.role
    })
  } catch (error) {
    return next(error)
  }
})

app.get('/employees', authenticate(), async (request, response, next) => {
  try {
    const employees = request.auth.role === 'admin'
      ? await Employee.find({ role: 'employee' }).sort({ firstName: 1 })
      : await Employee.find({ _id: request.auth.id, role: 'employee' })

    return response.json(employees.map(serializeEmployee))
  } catch (error) {
    return next(error)
  }
})

app.post('/tasks', authenticate('admin'), async (request, response, next) => {
  try {
    const { employeeId, taskTitle, taskDescription, taskDate, category } = request.body
    if (![employeeId, taskTitle, taskDescription, taskDate, category].every((value) => typeof value === 'string' && value.trim())) {
      return response.status(400).json({ message: 'All task fields and an employee are required' })
    }

    const employee = await Employee.findOne({ _id: employeeId, role: 'employee' })
    if (!employee) return response.status(404).json({ message: 'Employee not found' })

    employee.tasks.push({
      taskTitle: taskTitle.trim(),
      taskDescription: taskDescription.trim(),
      taskDate,
      category: category.trim(),
      status: 'new',
      activity: [{ action: 'Assigned', at: new Date() }]
    })
    await employee.save()
    return response.status(201).json(serializeEmployee(employee))
  } catch (error) {
    return next(error)
  }
})

app.patch('/tasks/:taskId/status', authenticate(), async (request, response, next) => {
  try {
    const { status } = request.body
    if (!['inProgress', 'rejected', 'completed'].includes(status)) {
      return response.status(400).json({ message: 'Invalid task status' })
    }

    const employee = await Employee.findById(request.auth.id)
    if (!employee || employee.role !== 'employee') {
      return response.status(403).json({ message: 'Only employees can update task status' })
    }

    const task = employee.tasks.id(request.params.taskId)
    if (!task) return response.status(404).json({ message: 'Task not found' })

    const currentStatus = getTaskStatus(task)
    const allowedTransition = currentStatus === 'new'
      ? ['inProgress', 'rejected'].includes(status)
      : currentStatus === 'inProgress' && status === 'completed'

    if (!allowedTransition) {
      return response.status(409).json({ message: `Cannot change task from ${currentStatus} to ${status}` })
    }

    task.status = status
    task.activity.push({
      action: status === 'inProgress' ? 'Accepted' : status === 'rejected' ? 'Rejected' : 'Completed',
      at: new Date()
    })
    await employee.save()
    return response.json(serializeEmployee(employee))
  } catch (error) {
    return next(error)
  }
})

app.use((error, request, response, next) => {
  if (response.headersSent) return next(error)
  if (error.code === 11000) {
    return response.status(409).json({ message: 'An account with this email already exists' })
  }
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return response.status(400).json({ message: error.message })
  }
  console.error(error)
  return response.status(500).json({ message: 'Server error. Check the API server logs.' })
})

export const initializeDatabase = async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be configured in .env')
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be configured with at least 32 characters')
  }

  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  await seedDatabase()
}

export default app
