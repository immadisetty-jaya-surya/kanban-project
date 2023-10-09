import React, { useEffect, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'

const Column = ({ data, children }) => {
  const [winReady, setWinReady] = useState(false)
  useEffect(() => {
    setWinReady(true)
  }, [])
  return (
    <div>
      <h3>
        <span>
          {data.name} ({data.tasks.length})
        </span>
      </h3>
      {winReady ? (
        <Droppable droppableId={data.name}>
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
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
