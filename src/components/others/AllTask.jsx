import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { getTaskCounts, getTaskStatus } from '../../utils/tasks'

const statusLabels = {
  new: 'Pending acceptance',
  inProgress: 'In Progress',
  completed: 'Completed',
  rejected: 'Rejected'
}

const statusStyles = {
  new: 'bg-sky-900 text-sky-200',
  inProgress: 'bg-amber-900 text-amber-200',
  completed: 'bg-emerald-900 text-emerald-200',
  rejected: 'bg-rose-900 text-rose-200'
}

const AllTask = () => {
  const { employees } = useContext(AuthContext)
  const assignedTasks = employees.flatMap((employee) =>
    employee.tasks.map((task) => ({ ...task, employeeName: employee.firstName }))
  )

  return (
    <section className="mt-8 space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Employee progress</h2>
        <p className="mt-1 text-sm text-gray-400">Track assigned, active, completed, and rejected work by employee.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {employees.map((employee) => {
          const counts = getTaskCounts(employee.tasks)
          const progressTotal = counts.newTask + counts.active + counts.completed
          const progress = progressTotal ? Math.round((counts.completed / progressTotal) * 100) : 0

          return (
            <article key={employee.id} className="rounded-xl border border-gray-700 bg-[#1c1c1c] p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{employee.firstName}</h3>
                  <p className="text-sm text-gray-400">{employee.tasks.length} assigned tasks</p>
                </div>
                <span className="rounded-full bg-emerald-950 px-3 py-1 text-sm font-semibold text-emerald-300">{progress}%</span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-700">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${progress}%` }} />
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                <div><dt className="text-gray-400">Pending</dt><dd className="mt-1 font-semibold">{counts.newTask}</dd></div>
                <div><dt className="text-gray-400">In progress</dt><dd className="mt-1 font-semibold">{counts.active}</dd></div>
                <div><dt className="text-gray-400">Completed</dt><dd className="mt-1 font-semibold">{counts.completed}</dd></div>
                <div><dt className="text-gray-400">Rejected</dt><dd className="mt-1 font-semibold">{counts.failed}</dd></div>
              </dl>
            </article>
          )
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-700 bg-[#1c1c1c]">
        <div className="border-b border-gray-700 p-5">
          <h3 className="text-xl font-semibold">Assigned task tracking</h3>
          <p className="mt-1 text-sm text-gray-400">Latest status for every task assigned by admin.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-[#292929] text-gray-300">
              <tr>
                <th className="px-5 py-3 font-medium">Task</th>
                <th className="px-5 py-3 font-medium">Employee</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Due date</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {assignedTasks.map((task) => {
                const status = getTaskStatus(task)
                return (
                  <tr key={task.id} className="border-t border-gray-700">
                    <td className="px-5 py-4 font-medium">{task.taskTitle}</td>
                    <td className="px-5 py-4">{task.employeeName}</td>
                    <td className="px-5 py-4 text-gray-300">{task.category}</td>
                    <td className="px-5 py-4 text-gray-300">{task.taskDate}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}>
                        {statusLabels[status]}
                      </span>
                    </td>
                  </tr>
                )
              })}
              {!assignedTasks.length && (
                <tr><td colSpan="5" className="px-5 py-8 text-center text-gray-400">No tasks assigned yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default AllTask
