
import { useContext, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthContext'

const App = () => {
  const [session, setSession] = useState(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    return loggedInUser ? JSON.parse(loggedInUser) : null
  })
  const [userData] = useContext(AuthContext)
  const user = session?.role
  const loggedInUserData = userData?.find(
    (employee) => employee.id === session?.data?.id
  ) ?? session?.data

  const handleLogin = (email, password) => {
    if (email === 'admin@me.com' && password === '123') {
      const adminSession = { role: 'admin' }
      setSession(adminSession)
      localStorage.setItem('loggedInUser', JSON.stringify(adminSession))
    } else if (userData) {
      const employee = userData.find(
        (e) => email === e.email && password === e.password
      )

      if (employee) {
        const employeeSession = { role: 'employee', data: employee }
        setSession(employeeSession)
        localStorage.setItem('loggedInUser', JSON.stringify(employeeSession))
      } else {
        alert('Invalid Credentials')
      }
    } else {
      alert('Employee data not available')
    }
  }

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    setSession(null)
  }

  return (
    <>
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : user === 'admin' ? (
        <AdminDashboard changeUser={handleLogout} />
      ) : user === 'employee' ? (
        loggedInUserData ? (
          <EmployeeDashboard
            changeUser={handleLogout}
            data={loggedInUserData}
          />
        ) : (
          <Login handleLogin={handleLogin} />
        )
      ) : null}
    </>
  )
}

export default App
