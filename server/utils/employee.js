import { getTaskCounts, getTaskStatus, setTaskStatus } from '../../src/utils/tasks.js'

export const serializeEmployee = (employee) => {
  const tasks = employee.tasks.map((task) => {
    const plainTask = task.toObject ? task.toObject() : task
    const status = plainTask.status ?? getTaskStatus(plainTask)

    return {
      id: plainTask._id?.toString() ?? plainTask.id,
      taskTitle: plainTask.taskTitle,
      taskDescription: plainTask.taskDescription,
      taskDate: plainTask.taskDate,
      category: plainTask.category,
      ...setTaskStatus({}, status),
      activity: (plainTask.activity ?? []).map((activity) => ({
        action: activity.action,
        at: activity.at
      }))
    }
  })

  return {
    id: employee._id.toString(),
    firstName: employee.firstName,
    username: employee.username,
    email: employee.email,
    role: employee.role,
    tasks,
    taskCounts: getTaskCounts(tasks)
  }
}
