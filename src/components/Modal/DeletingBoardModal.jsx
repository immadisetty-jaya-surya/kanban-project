import { useBoards } from '@/context'

const DeletingBoardModal = ({ onConfirm, onClose }) => {
  const { currentBoard } = useBoards()
  return (
    <div className="w-full mx-auto rounded-md p-6 bg-purple-200 dark:bg-darkGrey md:p-8">
      {/* space-y-6 w-full mx-auto rounded-md p-6 bg-white dark:bg-darkGrey md:p-8 */}
      <h1 className="text-mainRed heading-lg">delete this board ?</h1>
      <p className="body-lg font-semibold ">
        do u need 2 delete &apos;{currentBoard.name}&apos; board? this deletion
        will remove all columns & tasks and can`t take it back
      </p>
      <div className="flex gap-4 justify-center">
        <button
          className="flex-1 capitalize bg-mainRed text-white text-base rounded-full p-2 transition duration-200 hover:bg-mainRedHover"
          // flex-1 bg-mainRed text-white text-base rounded-full p-2 transition duration-200 hover:bg-mainRedHover
          onClick={() => {
            onConfirm()
          }}>
          delete
        </button>
        <button
          onClick={onClose}
          className="flex-1 capitalize bg-blue-950 text-white rounded-full text-base p-2 bg-opacity-50 transition duration-200 hover:bg-opacity-75 dark:bg-opacity-100">
          {/* flex-1 bg-mainPurple bg-opacity-10 text-mainPurple text-base rounded-full p-2 transition duration-200 hover:bg-opacity-25 dark:bg-opacity-100 dark:bg-white */}
          cancel
        </button>
      </div>
    </div>
  )
}

export default DeletingBoardModal
