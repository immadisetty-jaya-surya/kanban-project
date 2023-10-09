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
    <div>
      <div>
        <h1>{data.title}</h1>
        <EditButton
          switchToUpdate={switchToUpdate}
          switchToDelete={switchToDelete}
          taskId={data.id}
          type="Task"
        />
      </div>
      <p>{data.description}</p>
      <h3>
        Subtasks ({completedSubtasks} of {data.subtasks.length})
      </h3>
      {data.subtasks.map((subtask, i) => (
        <label key={i} htmlFor={`${subtask}-${i}`}>
          <input
            id={`${subtask}-${i}`}
            type="checkbox"
            checked={subtask.isCompleted}
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
