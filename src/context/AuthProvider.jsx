
import { useCallback, useState } from 'react'
import { AuthContext } from './AuthContext'
import { api } from '../utils/api'

const AuthProvider = ({ children }) => {
  const [employees, setEmployees] = useState([])
  const refreshEmployees = useCallback(async () => {
    const records = await api.get('/employees')
    setEmployees(records)
    return records
  }, [])

  return (
    <div>
      <AuthContext.Provider value={{ employees, setEmployees, refreshEmployees }}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthProvider
