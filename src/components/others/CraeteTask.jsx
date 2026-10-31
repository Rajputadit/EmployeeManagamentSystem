
import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const CreateTask = () => {

  const [userData, setUserData] = useContext(AuthContext)

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [asgnTo, setAsignTo] = useState('')
  const [category, setCategory] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    const assignedEmployee = userData.employees.find(
      (elem) => elem.firstName.toLowerCase() === asgnTo.trim().toLowerCase()
    )

    if (!assignedEmployee) {
      alert('Employee not found!')
      return
    }

    const newTask = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      active: false,
      newTask: true,
      failed: false,
      completed: false
    }

    const updatedEmployees = userData.employees.map((elem) => {
      if (elem.firstName.toLowerCase() === asgnTo.trim().toLowerCase()) {
        return {
          ...elem,
          tasks: [...elem.tasks, newTask],
          taskCounts: {
            ...elem.taskCounts,
            newTask: elem.taskCounts.newTask + 1
          }
        }
      }

      return elem
    })

    setUserData({
      ...userData,
      employees: updatedEmployees
    })

    alert('Task created successfully!')

    setAsignTo('')
    setCategory('')
    setTaskDate('')
    setTaskDescription('')
    setTaskTitle('')
  }

  return (
    <div className="p-5 bg-[#1c1c1c] mt-7 rounded">
      <form onSubmit={submitHandler} className="flex flex-wrap w-full items-start justify-between">

        <div className="w-2/5">

          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="text-sm py-1 px-2 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-white"
              type="text"
              placeholder="Make a UI design"
              required
            />
          </div>

          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Date</h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="text-sm py-1 px-2 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-white"
              type="date"
              required
            />
          </div>

          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Assign to</h3>
            <input
              value={asgnTo}
              onChange={(e) => setAsignTo(e.target.value)}
              className="text-sm py-1 px-2 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-white"
              type="text"
              placeholder="Employee name"
              required
            />
          </div>

          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm py-1 px-2 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-white"
              type="text"
              placeholder="Design, dev, etc."
              required
            />
          </div>

        </div>

        <div className="w-2/5 flex flex-col items-start">

          <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>

          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full h-32 text-sm py-2 px-2 rounded outline-none bg-transparent border-[1px] border-gray-400 text-white mb-4 resize-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-sm py-2 px-4 rounded text-white"
          >
            Create Task
          </button>

        </div>
      </form>
    </div>
  )
}

export default CreateTask
