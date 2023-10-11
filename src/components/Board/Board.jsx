import { useBoards } from '@/context'
import React from 'react'
import NoBoardsFound from './NoBoardsFound'
import EmptyBoard from './EmptyBoard'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
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
  if (!currentBoard.columns.length) return <EmptyBoard />
  return (
    <main className="overflow-y-hidden scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent flex-1 p-4 space-x-7 bg-purple-400 flex">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {currentBoard.columns.map((column, i) => (
          <Droppable droppableId={column.id} key={column.id}>
            {/* Added droppableId for each column */}
            {(provided) => (
              <Column data={column} key={i} provided={provided}>
                {column.tasks.map((taskId, j) => (
                  <Draggable draggableId={taskId} index={j} key={taskId}>
                    {/* Added draggableId for each task */}
                    {(provided) => (
                      <Task data={column.tasks} index={j} provided={provided} />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Column>
            )}
          </Droppable>
        ))}
      </DragDropContext>
      <NewColumn />
    </main>
  )
}

export default Board
