import useOnClickOutside from '@/hooks/useOnClickOutside'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Modal from '../Modal'
import UpdatingBoardModal from '../Modal/UpdatingBoardModal'
import DeletingBoardModal from '../Modal/DeletingBoardModal'

const EditButton = ({
  type,
  onConfirm,
  switchToUpdate,
  switchToDelete,
  className = '',
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showUpdateBoardModal, setShowUpdateBoardModal] = useState(false)
  const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false)
  const menuRef = useRef()
  useOnClickOutside(menuRef, () => setShowMenu(false))
  const menuVariations = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
        delay: 0,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  }
  return (
    <div className="relative">
      <button className="h-8 w-8" onClick={() => setShowMenu(!showMenu)}>
        <Image
          src="/icon-vertical-ellipsis.svg"
          alt="vertical ellipsis symbol for menu"
          height={16}
          width={4}
        />
      </button>
      <motion.div
        ref={menuRef}
        variants={menuVariations}
        initial="closed"
        animate={showMenu ? 'open' : 'closed'}
        className={`${className} flex flex-col items-start space-y-4 absolute body-lg rounded-lg p-4 w-48 shadow-main capitalize bg-white dark:veryDarkGrey`}>
        {type === 'board' ? (
          <>
            <button
              className="text-mediumGrey"
              onClick={() => {
                setShowUpdateBoardModal(!showUpdateBoardModal)
              }}>
              edit {type}
            </button>
            <Modal
              show={showUpdateBoardModal}
              onClose={() => setShowUpdateBoardModal(!showUpdateBoardModal)}>
              <UpdatingBoardModal
                onConfirm={() => setShowUpdateBoardModal(!showUpdateBoardModal)}
              />
            </Modal>
            <button
              className="text-mainRed"
              onClick={() => setShowDeleteBoardModal(!showDeleteBoardModal)}>
              delete{type}
            </button>
            <Modal
              show={showDeleteBoardModal}
              onClose={() => setShowDeleteBoardModal(!showDeleteBoardModal)}>
              <DeletingBoardModal
                onConfirm={() => setShowDeleteBoardModal(!showDeleteBoardModal)}
              />
            </Modal>
          </>
        ) : (
          <>
            <button
              className="text-mediumGrey"
              onClick={() => switchToUpdate()}>
              edit {type}
            </button>
            <button onClick={() => switchToDelete()} className="text-mainRed">
              delete {type}
            </button>
          </>
        )}
      </motion.div>
    </div>
  )
}

export default EditButton
