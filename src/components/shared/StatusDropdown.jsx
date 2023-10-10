import { useBoards } from '@/context'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const StatusDropdown = ({
  label = 'Status',
  data = null,
  status,
  setStatus,
}) => {
  const { columns, changeTaskStatus } = useBoards()
  const [showMenu, setShowMenu] = useState(false)
  const menuVariations = {
    closed: {
      opacity: 0,
      pointerEvents: 'none',
    },
    open: {
      opacity: 1,
      pointerEvents: 'auto',
    },
  }
  return (
    <>
      <h3 className="mt-6 mb-2 body-md text-mediumGrey dark:text-white">
        {label}{' '}
      </h3>
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          type="button"
          className="inline-flex justify-between items-center w-full rounded-md outline outline-1 outline-lightGreyLine shadow-sm px-4 py-2 bg-white text-sm font-medium text-black focus:outline-mainPurple dark:bg-darkGrey dark:text-white dark:outline-darkGreyLine"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true">
          {status || data.status}
          <svg
            className="-mr-1 ml-2 h-5 w-5 fill-mainPurple"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            fill="currentColor"
            aria-hidden="true">
            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
          </svg>
        </button>
        <motion.div
          className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white focus:outline-none dark:bg-veryDarkGrey"
          initial="closed"
          variants={menuVariations}
          animate={showMenu ? 'open' : 'closed'}>
          <div className="py-1">
            {columns.map((column, i) => (
              <a
                onClick={() => {
                  if (status) {
                    setStatus(column.name)
                  } else {
                    changeTaskStatus(data.id, column.name)
                  }
                  setShowMenu(false)
                }}
                key={i}
                href="#"
                className="text-mediumGrey block px-4 py-2 text-sm hover:text-mainPurple hover:bg-mainPurple dark:hover:bg-white hover:bg-opacity-10 dark:hover:bg-opacity-10">
                {column.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default StatusDropdown
