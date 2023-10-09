import useOnClickOutside from '@/hooks/useOnClickOutside'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Modal from '../Modal'
import UpdatingBoardModal from '../Modal/UpdatingBoardModal'

const EditButton = ({
  type,
  onConfirm,
  switchToUpdate,
  switchToDelete,
  className = '',
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showUpdateBoardModel, setShowUpdateBoardModel] = useState(false)
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
    <div>
      <button onClick={() => setShowMenu(!showMenu)}>
        <Image
          src="src/components/shared/ellipsis-vertical-svgrepo-com.svg"
          alt="vertical ellipsis symbol for menu"
          height={16}
          width={4}
        />
      </button>
      <motion.div
        ref={menuRef}
        variants={menuVariations}
        initial={closed}
        animate={showMenu ? open : closed}>
        {type === 'board' ? (
          <>
            <button
              onClick={() => {
                setShowUpdateBoardModel(!showUpdateBoardModel)
              }}>
              edit {type}
            </button>
            <Modal
              show={showUpdateBoardModel}
              onClose={() => setShowUpdateBoardModel(!showUpdateBoardModel)}>
              <UpdatingBoardModal
                onConfirm={() => setShowUpdateBoardModel(!showUpdateBoardModel)}
              />
            </Modal>
          </>
        ) : (
          <>
            <button
              onClick={() => switchToUpdate()}
              className="text-mediumGrey">
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
