import React, { useState } from 'react'
import Modal from '../Modal'
import CreateNewColumnModal from '../Modal/CreateNewColumnModal'

const NewColumn = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <button
        className="heading-xl text-mediumGrey transition duration-400 hover:text-mainPurple mt-10 flex items-center justify-center min-w-[280px] rounded-md bg-gradient-to-b from-[#E9EFFA] dark:from-[#2b2c373f] to-[rgba(233,239250,0.5)] dark:to-[#2b2c371f]"
        onClick={() => setOpenModal(true)}>
        + New Column
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <CreateNewColumnModal onClose={() => setOpenModal(false)} />
      </Modal>
    </>
  )
}

export default NewColumn
