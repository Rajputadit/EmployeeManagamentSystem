import Header from '../others/Header'
import TaskListNumber from '../others/TaskListNumber'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = (props) => {
  
  
  return (
    <div className='min-h-screen bg-[#1c1c1c] p-5 md:p-10'>
      <Header changeUser={props.changeUser} name={props.data.firstName}/>
      <TaskListNumber data={props.data}/>
      <TaskList data={props.data}/>
    </div>
  )
}

export default EmployeeDashboard
