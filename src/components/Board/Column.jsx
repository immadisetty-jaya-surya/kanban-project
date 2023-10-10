import React, { useEffect, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'

const Column = ({ data, children }) => {
  const [winReady, setWinReady] = useState(false)
  useEffect(() => {
    setWinReady(true)
  }, [])
  return (
    <div className="column w-[280px] shrink-0">
      <h3 className="heading-sm uppercase underline mb-0">
        <span className="task-status inline-block h-3 w-3 rounded-full mr-3">
          {data.name} ({data.tasks.length})
        </span>
      </h3>
      {winReady ? (
        <Droppable droppableId={data.name}>
          {(provided) => (
            <ul
              className="scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent overflow-y-scroll h-full pb-12 flex flex-col gap-5 "
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {children}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      ) : null}
    </div>
  )
}

export default Column
