
import React from 'react'

const Failed = ({data}) => {
  return (
    <div className="flex-shrink-0 h-full w-[300px] p-13 bg-red-400 rounded-xl flex flex-col">

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
        <button className="w-full bg-red-700 hover:bg-red-800 text-white py-2 px-3 text-sm font-medium rounded-lg">
          Failed Task
        </button>
      </div>

    </div>
  )
}

export default Failed

