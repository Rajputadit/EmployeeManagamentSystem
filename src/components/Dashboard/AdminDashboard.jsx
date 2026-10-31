import Header from '../others/Header'
import CreateTask from '../others/CraeteTask'
import AllTask from '../others/AllTask'

const AdminDashboard = (props) => {
  return (
    <div className="min-h-screen bg-[#111] p-10">
      <Header changeUser={props.changeUser} name="Admin"/>
      <CreateTask/>
      <AllTask/>
    </div>
  )
}

export default AdminDashboard
