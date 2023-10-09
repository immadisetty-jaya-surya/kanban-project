import useWindowSize from '@/hooks/useWindowSize'
import Image from 'next/image'
import { useState } from 'react'
import Modal from '../Modal'
import CreateNewTaskModal from '../Modal/CreateNewTaskModal'

const AddNewTask = () => {
  const [openTaskModal, setOpenTaskModal] = useState(false)
  const { width } = useWindowSize()
  return (
    <>
      {width > 768 ? (
        <button className="" onClick={() => setOpenTaskModal(true)}>
          + add new task
        </button>
      ) : (
        <button>
          <Image
            src="src/components/Header/add-circle-svgrepo-com (1).svg"
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
