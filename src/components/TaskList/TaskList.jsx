import { useContext, useMemo, useState } from 'react'
import AcceptTask from './AcceptTask'
import CompleteTask from './CompleteTask'
import Failed from './Failed'
import NewTask from './NewTask'
import { AuthContext } from '../../context/AuthContext'
import { getActivityLabel, getTaskCounts, getTaskStatus, setTaskStatus } from '../../utils/tasks'

const categories = [
  { id: 'new', label: 'Pending acceptance' },
  { id: 'inProgress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
  { id: 'rejected', label: 'Rejected' },
  { id: 'activity', label: 'Activity' }
]

const TaskList = ({ data }) => {
  const [employees, setEmployees] = useContext(AuthContext)
  const [category, setCategory] = useState('new')
  const [titleFilter, setTitleFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  const taskCounts = getTaskCounts(data.tasks)
  const filteredTasks = useMemo(() => data.tasks.filter((task) => {
    const matchesTitle = task.taskTitle.toLowerCase().includes(titleFilter.trim().toLowerCase())
    const matchesDate = !dateFilter || task.taskDate === dateFilter
    return matchesTitle && matchesDate
  }), [data.tasks, titleFilter, dateFilter])

  const filteredActivity = useMemo(() => data.tasks
    .flatMap((task) => (task.activity ?? []).map((activity) => ({
      ...activity,
      taskTitle: task.taskTitle,
      taskDate: task.taskDate,
      category: task.category
    })))
    .filter((activity) => {
      const matchesTitle = activity.taskTitle.toLowerCase().includes(titleFilter.trim().toLowerCase())
      const matchesDate = !dateFilter || activity.taskDate === dateFilter
      return matchesTitle && matchesDate
    })
    .sort((first, second) => new Date(second.at) - new Date(first.at)), [
    data.tasks,
    titleFilter,
    dateFilter
  ])

  const updateTask = (taskId, status) => {
    const updatedEmployees = employees.map((employee) => {
      if (employee.id !== data.id) return employee

      const tasks = employee.tasks.map((task) => {
        if (task.id !== taskId || getTaskStatus(task) !== (status === 'inProgress' || status === 'rejected' ? 'new' : 'inProgress')) {
          return task
        }

        return {
          ...setTaskStatus(task, status),
          activity: [
            ...(task.activity ?? []),
            { action: getActivityLabel(status), at: new Date().toISOString() }
          ]
        }
      })

      return { ...employee, tasks, taskCounts: getTaskCounts(tasks) }
    })

    localStorage.setItem('employees', JSON.stringify(updatedEmployees))
    setEmployees(updatedEmployees)
  }

  const visibleTasks = filteredTasks.filter((task) => getTaskStatus(task) === category)
  const countForCategory = (id) => {
    if (id === 'activity') return data.tasks.reduce((count, task) => count + (task.activity?.length ?? 0), 0)
    if (id === 'new') return taskCounts.newTask
    if (id === 'inProgress') return taskCounts.active
    if (id === 'completed') return taskCounts.completed
    return taskCounts.failed
  }

  return (
    <section className="mt-8 rounded-xl bg-[#242424] p-5">
      <div className="mb-5 flex flex-col gap-3 md:flex-row">
        <input
          value={titleFilter}
          onChange={(event) => setTitleFilter(event.target.value)}
          placeholder="Filter by task title"
          className="min-w-0 flex-1 rounded-lg border border-gray-600 bg-[#161616] px-4 py-3 text-white outline-none focus:border-emerald-500"
          type="search"
        />
        <input
          value={dateFilter}
          onChange={(event) => setDateFilter(event.target.value)}
          aria-label="Filter tasks by date"
          className="rounded-lg border border-gray-600 bg-[#161616] px-4 py-3 text-white outline-none focus:border-emerald-500"
          type="date"
        />
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() => setCategory(item.id)}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium ${
              category === item.id ? 'bg-emerald-600 text-white' : 'bg-[#353535] text-gray-300 hover:bg-[#444]'
            }`}
          >
            {item.label} ({countForCategory(item.id)})
          </button>
        ))}
      </div>

      {category === 'activity' ? (
        <div className="max-h-[28rem] space-y-3 overflow-y-auto">
          {filteredActivity.length ? filteredActivity.map((activity, index) => (
            <article key={`${activity.at}-${index}`} className="flex flex-col gap-2 rounded-lg border border-gray-700 bg-[#1a1a1a] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">{activity.taskTitle}</p>
                <p className="mt-1 text-sm text-gray-400">{activity.category} · due {activity.taskDate}</p>
              </div>
              <div className="text-sm sm:text-right">
                <p className="font-medium text-emerald-400">{activity.action}</p>
                <time className="text-gray-400">{new Date(activity.at).toLocaleString()}</time>
              </div>
            </article>
          )) : <p className="py-8 text-center text-gray-400">No activity matches these filters.</p>}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleTasks.length ? visibleTasks.map((task) => {
            if (category === 'new') {
              return (
                <NewTask
                  key={task.id}
                  data={task}
                  onAccept={() => updateTask(task.id, 'inProgress')}
                  onReject={() => updateTask(task.id, 'rejected')}
                />
              )
            }

            if (category === 'inProgress') {
              return <AcceptTask key={task.id} data={task} onComplete={() => updateTask(task.id, 'completed')} />
            }

            if (category === 'completed') return <CompleteTask key={task.id} data={task} />
            return <Failed key={task.id} data={task} />
          }) : <p className="col-span-full py-8 text-center text-gray-400">No tasks match this category and filters.</p>}
        </div>
      )}
    </section>
  )
}

export default TaskList
