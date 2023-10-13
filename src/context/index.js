import { createContext, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import data from 'src/data.json'
import useLocalStorage from 'src/hooks/useLocalStorage.js'
import stringToSlug from 'src/utils/stringToSlug.js'
// import { error } from 'console'

const BoardContext = createContext()

function BoardProvider({ children }) {
  const [boards, setBoards] = useLocalStorage('boards', data.boards)
  const [activeBoard, setActiveBoard] = useState(0)
  const currentBoard = boards[activeBoard]
  const columns = currentBoard?.columns

  const createTask = (task) => {
    task.id = uuidv4()
    console.log(task.id)
    const column = columns.find((column) => column.name === task.status)
    task.status = column.name
    task.subtasks = task.subtasks.map((subtasks) => {
      return {
        ...subtasks,
        isCompleted: false,
      }
    })
    task.slug = stringToSlug(task.title)
    console.log(task)
    column.tasks.push(task.id)
    currentBoard.tasks.push(task)
    setBoards([...boards])
  }
  const createColumn = (column) => {
    column.id = uuidv4()
    console.log(column.id)
    column.tasks = []
    currentBoard.columns.push(column)
    setBoards([...boards])
  }
  const createBoard = (board) => {
    console.log('HIIIIIIII')
    board.id = uuidv4()
    console.log(board.id)
    let newColumns = []
    newColumns = board.columns.filter((e) => e)
    newColumns.length
      ? (newColumns = newColumns.map((column) => {
          return {
            id: uuidv4(),
            name: column,
            tasks: [],
            slug: stringToSlug(column),
          }
        }))
      : null
    console.log(newColumns)
    board.columns = newColumns
    board.tasks = []
    setBoards([...boards, board])
  }
  const updateTask = (updatedTask) => {
    const task = currentBoard.tasks.find((task) => task.id === updatedTask.id)
    task.title = updatedTask.title
    task.subtasks = updatedTask.subtasks
    task.slug = stringToSlug(task.title)
    if (updatedTask.status !== task.status) {
      const column = currentBoard.columns.find(
        (column) => column.name === updatedTask.status
      )
      const columnToRemove = currentBoard.columns.find(
        (column) => column.name === task.status
      )
      columnToRemove.tasks.splice(columnToRemove.tasks.indexOf(task.id), 1)
      column.tasks.push(task.id)
    }
    task.status = updatedTask.status
    setBoards([...boards])
  }
  const updateBoard = (updatedBoard) => {
    let newBoard = {
      ...currentBoard,
      name: updatedBoard.name,
      columns: updatedBoard.columns,
    }
    newBoard.columns.forEach((column, index) => {
      column.name = updatedBoard.columns[index].name
      column.slug = stringToSlug(updatedBoard.columns[index].name)
    })
    const boardIndex = boards.findIndex((board) => board.id === newBoard.id)
    boards[boardIndex] = newBoard
    setBoards([...boards])
  }
  const toggleSubtask = (taskId, subtaskId) => {
    const task = currentBoard.tasks.find((task) => task.id === taskId)
    const subtask = task.subtasks[subtaskId]
    subtask.isCompleted
      ? (subtask.isCompleted = false)
      : (subtask.isCompleted = true)
    setBoards([...boards])
  }
  const changeTaskStatus = (taskId, status) => {
    const task = currentBoard.tasks.find((task) => task.id === taskId)
    const column = columns.find((column) => column.name === status)
    const prevColumn = columns.find((column) => column.name === task.status)
    prevColumn.tasks = prevColumn.tasks.filter((id) => id !== taskId)
    column.task.push(taskId)
    task.status = column.name
    setBoards([...boards])
  }
  const deleteTask = (taskId) => {
    const task = currentBoard.tasks.find((task) => task.id === taskId)
    const column = columns.find((column) => column.name === task.status)
    column.tasks = column.tasks.filter((id) => id !== taskId)
    console.log(currentBoard.tasks)
    currentBoard.tasks = currentBoard.tasks.filter((id) => id !== taskId)
    setBoards([...boards])
  }
  const deleteBoard = (boardId) => {
    setActiveBoard(0)
    setBoards(boards.filter((board) => board.id !== boardId))
  }
  const dragTask = (source, destination) => {
    if (!destination) {
      return
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }
    if (source.droppableId === destination.droppableId) {
      const column = columns.find(
        (column) => column.name === source.droppableId
      )
      const taskId = column.tasks[source.index]
      column.tasks.splice(source.index, 1)
      column.tasks.splice(destination.index, 0, taskId)
      setBoards([...boards])
    } else {
      const column = columns.find(
        (column) => column.name === destination.droppableId
      )
      const taskId = column.tasks[source.index]
      const draggedTask = currentBoard.tasks.find((task) => task.id === taskId)
      draggedTask.status = destination.droppableId
      column.tasks.splice(source.index, 1)
      column.tasks.splice(destination.index, 0, taskId)
      setBoards([...boards])
    }
  }
  const value = {
    boards,
    setBoards,
    currentBoard,
    columns,
    createBoard,
    createColumn,
    toggleSubtask,
    createTask,
    changeTaskStatus,
    updateTask,
    updateBoard,
    deleteTask,
    deleteBoard,
    dragTask,
    setActiveBoard,
  }
  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}
const useBoards = () => {
  const context = useContext(BoardContext)
  if (context === undefined) {
    throw new Error('useBoards must be used within a board provider')
  }
  return context
}

export { BoardProvider, useBoards }
