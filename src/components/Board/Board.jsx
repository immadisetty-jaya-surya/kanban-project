import { useBoards } from '@/context'
import React from 'react'
import NoBoardsFound from './NoBoardsFound'
import EmptyBoard from './EmptyBoard'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Column'
import Task from './Task'
import NewColumn from './NewColumn'

const Board = () => {
  const { currentBoard, boards, dragTask } = useBoards()
  function handleOnDragEnd(result) {
    const { source, destination } = result
    dragTask(source, destination)
  }
  if (!boards.length) return <NoBoardsFound />
  if (!currentBoard.columns.length) return <EmptyBoard.jsx />
  return (
    <main className="overflow-y-hidden scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent flex-1 p-4 space-x-7 bg-purple-400 flex">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {currentBoard.columns.map((column, i) => (
          <Column data={column} key={i}>
            {column.tasks.map((taskId, j) => {
              const task = currentBoard.tasks.filter(
                (task) => task.id === taskId
              )[0]
              return <Task data={task} index={j} key={taskId} />
            })}
          </Column>
        ))}
      </DragDropContext>
      <NewColumn />
    </main>
  )
}

export default Board
