import React from 'react'
import AcceptTask from './AcceptTask'
import CompleteTask from './CompleteTask'
import Failed from './Failed'
import NewTask from './NewTask'

const TaskList = ({ data }) => {


  return (
    <div
      id="tasklist"
      className="h-[55%] w-full mt-5 py-5 flex items-center justify-start flex-nowrap gap-5 overflow-x-auto"
    >
      {data?.tasks?.map((elem, index) => {
        if (elem.active) {
          return <AcceptTask key={index} data={elem} />
        }

        if (elem.newTask) {
          return <NewTask key={index} data={elem} />
        }

        if (elem.completed) {
          return <CompleteTask key={index} data={elem} />
        }

        if (elem.failed) {
          return <Failed key={index} data={elem} />
        }

        return null
      })}
    </div>
  )
}

export default TaskList