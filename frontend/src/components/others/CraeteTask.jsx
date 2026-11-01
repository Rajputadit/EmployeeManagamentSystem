
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { api } from '../../utils/api'

const CreateTask = () => {
  const { employees, refreshEmployees } = useContext(AuthContext)

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [asgnTo, setAsignTo] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await api.post('/tasks', {
        employeeId: asgnTo,
        taskTitle,
        taskDescription,
        taskDate,
        category
      })
      await refreshEmployees()
      setAsignTo('')
      setCategory('')
      setTaskDate('')
      setTaskDescription('')
      setTaskTitle('')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSaving(false)
    }
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
            <select
              value={asgnTo}
              onChange={(e) => setAsignTo(e.target.value)}
              className="text-sm py-1 px-2 w-full rounded outline-none bg-[#111] border-[1px] border-gray-400 mb-4 text-white"
              required
            >
              <option value="">Select an employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>{employee.firstName} — {employee.email}</option>
              ))}
            </select>
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

          {error && <p role="alert" className="mb-3 text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={saving || employees.length === 0}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 text-sm py-2 px-4 rounded text-white"
          >
            {saving ? 'Creating...' : 'Create Task'}
          </button>

        </div>
      </form>
    </div>
  )
}

export default CreateTask
