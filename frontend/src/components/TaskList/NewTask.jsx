
const NewTask = ({ data, onAccept, onReject }) => {
  return (
    <div className="min-h-64 p-5 bg-gray-700 rounded-xl flex flex-col">

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

      <div className="mt-auto flex gap-2 pt-5">
        <button onClick={onAccept} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 text-sm font-medium rounded-lg">
          Accept
        </button>
        <button onClick={onReject} className="flex-1 bg-red-700 hover:bg-red-800 text-white py-2 px-3 text-sm font-medium rounded-lg">
          Reject
        </button>
      </div>

    </div>
  )
}

export default NewTask
