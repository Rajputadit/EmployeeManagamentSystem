export const getTaskStatus = (task) => {
  if (['new', 'inProgress', 'completed', 'rejected'].includes(task.status)) {
    return task.status
  }

  if (task.completed) return 'completed'
  if (task.failed) return 'rejected'
  if (task.active) return 'inProgress'
  return 'new'
}

export const setTaskStatus = (task, status) => ({
  ...task,
  status,
  newTask: status === 'new',
  active: status === 'inProgress',
  completed: status === 'completed',
  failed: status === 'rejected'
})

export const getTaskCounts = (tasks = []) =>
  tasks.reduce((counts, task) => {
    const status = getTaskStatus(task)

    if (status === 'new') counts.newTask += 1
    if (status === 'inProgress') counts.active += 1
    if (status === 'completed') counts.completed += 1
    if (status === 'rejected') counts.failed += 1

    return counts
  }, { newTask: 0, active: 0, completed: 0, failed: 0 })

export const getActivityLabel = (status) => {
  if (status === 'inProgress') return 'Accepted'
  if (status === 'completed') return 'Completed'
  if (status === 'rejected') return 'Rejected'
  return 'Assigned'
}
