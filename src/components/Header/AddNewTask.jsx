import useWindowSize from '@/hooks/useWindowSize'
import Image from 'next/image'
import { useState } from 'react'
// import Modal from 'src/components/Modal'
import CreateNewTaskModal from '../Modal/CreateNewTaskModal'
import Modal from '../Modal'
// import Modal from 'src/components/Modal/Modal.jsx'

const AddNewTask = () => {
  const [openTaskModal, setOpenTaskModal] = useState(false)
  const { width } = useWindowSize()
  return (
    <>
      {width > 768 ? (
        <button
          className="btn btn__primary btn-lg bg-purple-500 p-4 m-6 capitalize font-semibold"
          onClick={() => setOpenTaskModal(true)}>
          + add new task
        </button>
      ) : (
        <button
          className="btn btn__primary px-5 flex justify-center items-center bg-purple-400"
          onClick={() => setOpenTaskModal(true)}>
          <Image
            src="/icon-add-task-mobile.svg"
            alt="plus-icon"
            height={12}
            width={12}
          />
        </button>
      )}
      <Modal show={openTaskModal} onClose={() => setOpenTaskModal(false)}>
        <CreateNewTaskModal onclose={() => setOpenTaskModal(!openTaskModal)} />
      </Modal>
    </>
  )
}

export default AddNewTask
