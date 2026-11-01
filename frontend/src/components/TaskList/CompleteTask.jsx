
const CompleteTask = ({data}) => {
  return (
    <div className="min-h-64 p-5 bg-emerald-800 rounded-xl flex flex-col">

      <div className="flex justify-between items-center">
        <h3 className="bg-red-600 text-sm px-3 py-1 rounded text-white">{data.category}</h3>
        <h4 className="text-sm text-white">{data.taskDate}</h4>
      </div>

      <h2 className="mt-5 text-xl font-semibold text-white">
        {data.taskTitle}
      </h2>

      <p className="mt-2 text-sm text-white">
        {data.taskDescription}
      </p>

      <div className="mt-auto pt-5">
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-3 text-sm font-medium rounded-lg">
          Completed
        </button>
      </div>

    </div>
  )
}

export default CompleteTask
