
const TaskListNumber = ({ data }) => {


  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-5 w-full'>

      <div className='rounded-xl py-6 px-6 bg-red-500'>
        <h2 className='text-3xl font-semibold'>{data.taskCounts.newTask}</h2>
        <h3 className='text-xl font-medium'>Pending acceptance</h3>
      </div>

      <div className='rounded-xl py-6 px-6 bg-blue-500'>
        <h2 className='text-3xl font-semibold'>{data.taskCounts.completed}</h2>
        <h3 className='text-xl font-medium'>Completed</h3>
      </div>

      <div className='rounded-xl py-6 px-6 bg-yellow-500'>
        <h2 className='text-3xl font-semibold'>{data.taskCounts.active}</h2>
        <h3 className='text-xl font-medium'>In Progress</h3>
      </div>

      <div className='rounded-xl py-6 px-6 bg-orange-500'>
        <h2 className='text-3xl font-semibold'>{data.taskCounts.failed}</h2>
        <h3 className='text-xl font-medium'>Rejected</h3>
      </div>

    </div>
  )
}

export default TaskListNumber
