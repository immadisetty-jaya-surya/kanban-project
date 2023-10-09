const DeletingTaskModal = ({ title, onClose, onConfirm }) => {
  return (
    <div>
      <h1>delete this task ?</h1>
      <p>
        do u want to delete this &apos;{title}&apos; task and its subtasks ?
        this action cannot be reversed.
      </p>
      <div>
        <button onClick={onConfirm()}>delete</button>
        <button onClick={onClose}>cancel</button>
      </div>
    </div>
  )
}

export default DeletingTaskModal
