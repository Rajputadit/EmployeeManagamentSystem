
import { useState } from 'react'
import { AuthContext } from './AuthContext'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'
import { getTaskCounts, getTaskStatus, setTaskStatus } from '../utils/tasks'

const AuthProvider = ({ children }) => {

  const [userData, setUserData] = useState(() => {
    setLocalStorage()
    const { employees } = getLocalStorage()
    const normalizedEmployees = employees.map((employee) => {
      const tasks = employee.tasks.map((task, index) => ({
        ...setTaskStatus(task, getTaskStatus(task)),
        id: task.id ?? `${employee.id}-${index}`,
        activity: Array.isArray(task.activity) ? task.activity : []
      }))

      return {
        ...employee,
        tasks,
        taskCounts: getTaskCounts(tasks)
      }
    })

    localStorage.setItem('employees', JSON.stringify(normalizedEmployees))
    return normalizedEmployees
  })

  return (
    <div>
      <AuthContext.Provider value={[userData,setUserData]}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthProvider
