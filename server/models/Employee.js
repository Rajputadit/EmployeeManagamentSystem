import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema({
  action: { type: String, required: true },
  at: { type: Date, default: Date.now }
}, { _id: false })

const taskSchema = new mongoose.Schema({
  taskTitle: { type: String, required: true, trim: true },
  taskDescription: { type: String, required: true, trim: true },
  taskDate: { type: String, required: true },
  category: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['new', 'inProgress', 'completed', 'rejected'],
    default: 'new'
  },
  activity: { type: [activitySchema], default: [] }
}, { timestamps: true })

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true, maxlength: 60 },
  username: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin', 'employee'], default: 'employee' },
  tasks: { type: [taskSchema], default: [] }
}, { timestamps: true })

export default mongoose.model('Employee', employeeSchema)
