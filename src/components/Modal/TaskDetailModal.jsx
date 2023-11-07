import { useBoards } from '@/context'
import React from 'react'
import EditButton from '../shared/EditButton'
import StatusDropdown from '../shared/StatusDropdown'

const TaskDetailModal = ({
  data,
  switchToUpdate,
  switchToDelete,
  completedSubtasks,
}) => {
  const { toggleSubtask } = useBoards()
  return (
    <div className="w-full mx-auto rounded-md p-6 bg-purple-200 dark:bg-darkGrey md:p-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="heading-lg">{data.title}</h1>
        <EditButton
          switchToUpdate={switchToUpdate}
          switchToDelete={switchToDelete}
          taskId={data.id}
          type="Task"
          className="bottom-0 left-0 -translate-x-2/4 translate-y-28"
        />
      </div>
      <p className="body-lg text-blue-950 font-semibold">{data.description}</p>
      <h3 className="mt-6 mb-4 body-md text-blue-900 dark:text-white">
        Subtasks ({completedSubtasks} of {data.subtasks.length})
      </h3>
      {data.subtasks.map((subtask, i) => (
        <label
          key={i}
          htmlFor={`${subtask}-${i}`}
          className={`body-md p-3 mb-2 inline-flex w-full rounded transition bg-lightGrey cursor-pointer hover:bg-purple-300 hover:bg-opacity-75 dark:text-white dark:bg-veryDarkGrey dark:hover:bg-mainPurple dark:hover:bg-opacity-25`}>
          {/* `body-md p-3 mb-2 inline-flex w-full rounded transition bg-lightGrey cursor-pointer hover:bg-mainPurple hover:bg-opacity-25 dark:text-white dark:bg-veryDarkGrey dark:hover:bg-mainPurple dark:hover:bg-opacity-25` */}
          <input
            id={`${subtask}-${i}`}
            type="checkbox"
            checked={subtask.isCompleted}
            className="mr-3 accent-purple-700"
            onChange={() => toggleSubtask(data.id, i)}
          />
          <span
            className={`${
              subtask.isCompleted ? 'opacity-50 line-through' : 'opacity-100'
            } transition`}>
            {subtask.title}
          </span>
        </label>
      ))}
      <StatusDropdown label="current status" data={data} />
    </div>
  )
}

export default TaskDetailModal
