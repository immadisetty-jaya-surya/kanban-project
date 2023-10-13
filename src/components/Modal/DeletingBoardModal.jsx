import { useBoards } from '@/context'

const DeletingBoardModal = ({ onConfirm, onClose }) => {
  const { currentBoard } = useBoards()
  return (
    <div>
      <h1>delete this board ?</h1>
      <p>
        do u need 2 delete &apos;{currentBoard.name}&apos; board? this deletion
        will remove all columns & tasks and can`t take it back
      </p>
      <div>
        <button
          onClick={() => {
            onConfirm()
          }}>
          delete
        </button>
        <button onClick={onClose}>cancel</button>
      </div>
    </div>
  )
}

export default DeletingBoardModal
