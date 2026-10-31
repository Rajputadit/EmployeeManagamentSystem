import React from 'react'
import Header from '../others/Header'
import CreateTask from '../others/CraeteTask'
import AllTask from '../others/AllTask'

const AdminDashboard = (props) => {
  return (
    <>
      <Header/>
      <CreateTask/>
      <AllTask/>
    </>
  )
}

export default AdminDashboard
