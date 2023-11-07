const DeletingTaskModal = ({ title, onClose, onConfirm }) => {
  return (
    <div className="space-y-6 w-full mx-auto rounded-md p-6 bg-purple-200 dark:bg-mediumGrey md:p-8">
      <h1 className="text-mainRed heading-lg capitalize">delete this task ?</h1>
      <p className="body-lg">
        do u want to delete this &apos;{title}&apos; task and its subtasks ?
        this action cannot be reversed.
      </p>
      <div className="flex gap-4">
        <button
          className="flex-1 capitalize bg-mainRed text-white text-base rounded-full p-2 transition duration-200 hover:bg-mainRedHover"
          onClick={() => {
            onConfirm()
          }}>
          delete
        </button>
        <button
          className="flex-1 capitalize bg-blue-950 text-white rounded-full bg-opacity-50 text-base transition duration-200 hover:bg-opacity-75 dark:bg-opacity-100 dark:bg-white"
          onClick={onClose}>
          cancel
        </button>
      </div>
    </div>
  )
}

export default DeletingTaskModal
