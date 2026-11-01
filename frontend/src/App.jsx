
import { useCallback, useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthContext'
import { api } from './utils/api'
import useIdleTimeout from './utils/useIdleTimeout'

const App = () => {
  const [session, setSession] = useState(null)
  const [showRegistration, setShowRegistration] = useState(false)
  const [authLoading, setAuthLoading] = useState(() => Boolean(localStorage.getItem('authToken')))
  const [authError, setAuthError] = useState('')
  const { employees, setEmployees, refreshEmployees } = useContext(AuthContext)
  const user = session?.role
  const loggedInUserData = employees.find(
    (employee) => employee.id === session?.data?.id
  ) ?? session?.data

  useEffect(() => {
    if (!localStorage.getItem('authToken')) return

    const restoreSession = async () => {
      try {
        const currentUser = await api.get('/auth/me')
        await refreshEmployees()
        setSession({ role: currentUser.role, data: currentUser })
      } catch (error) {
        localStorage.removeItem('authToken')
        setAuthError(error.message)
      } finally {
        setAuthLoading(false)
      }
    }

    restoreSession()
  }, [refreshEmployees])

  const saveSession = async (result) => {
    localStorage.setItem('authToken', result.token)
    await refreshEmployees()
    setSession({ role: result.user.role, data: result.user })
    setAuthError('')
  }

  const handleLogin = async (credentials) => {
    try {
      await saveSession(await api.post('/auth/login', credentials))
    } catch (error) {
      localStorage.removeItem('authToken')
      setAuthError(error.message)
    }
  }

  const handleRegister = async (account) => {
    try {
      await saveSession(await api.post('/auth/register', account))
      setShowRegistration(false)
    } catch (error) {
      localStorage.removeItem('authToken')
      setAuthError(error.message)
    }
  }

  const handleLogout = useCallback(() => {
    localStorage.removeItem('authToken')
    setEmployees([])
    setSession(null)
  }, [setEmployees])

  useIdleTimeout(handleLogout, 15 * 60 * 1000, Boolean(user))

  if (authLoading) {
    return <main className="flex min-h-screen items-center justify-center text-gray-300">Connecting to your account...</main>
  }

  return (
    <>
      {!user ? (
        showRegistration ? (
          <Register
            handleRegister={handleRegister}
            showLogin={() => setShowRegistration(false)}
            error={authError}
          />
        ) : (
          <Login
            handleLogin={handleLogin}
            showRegister={() => setShowRegistration(true)}
            error={authError}
          />
        )
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
