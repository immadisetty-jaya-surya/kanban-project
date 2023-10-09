import useOnClickOutside from '@/hooks/useOnClickOutside'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({
  show,
  onClose,
  children,
  className = 'items-center justify-center',
}) => {
  const [isBrowser, setIsBrowser] = useState(true)
  const modalRef = useRef()
  useOnClickOutside(modalRef, () => onClose())
  const closeOnEscapeDown = (e) => {
    if ((e.keyCode || e.charCode) === 27) {
      onClose()
    }
  }
  useEffect(() => {
    setIsBrowser(true)
    document.body.addEventListener('keydown', closeOnEscapeDown)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeDown)
    }
  }, [])
  const backdropVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  }
  const modalVariant = {
    hidden: {
      y: '-200px',
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.25,
      },
    },
  }
  const modalContent = (
    <AnimatePresence>
      {show ? (
        <motion.div
          variants={backdropVariant}
          initial="hidden"
          animate="visible"
          exit="hidden">
          <motion.div ref={modalRef} variants={modalVariant}>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
  if (isBrowser) {
    return createPortal(modalContent, document.querySelector('#modal'))
  } else {
    return null
  }
}

export default Modal
