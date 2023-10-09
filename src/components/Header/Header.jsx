import { useBoards } from '@/context'
import useWindowSize from '@/hooks/useWindowSize'
import { Image } from 'next/image'
import { AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import Modal from '../Modal'
import MobileBoardMenu from '../Modal/MobileBoardMenu'
import AddNewTask from './AddNewTask'
import EditButton from '../shared/EditButton'

const Header = () => {
  const { width } = useWindowSize()
  const [showMenu, setShowMenu] = useState(false)
  const { currentBoard, deleteBoard } = useBoards()
  const { theme } = useTheme()
  return (
    <header>
      <div>
        <AnimatePresence>
          {width <= 768 ? (
            <>
              <Image
                src="src/components/Header/slider-minimalistic-horizontal-svgrepo-com.svg"
                alt="kanban-logo"
                height={25}
                width={24}
              />
              <button onClick={() => setShowMenu(true)}>
                <h2>{currentBoard?.name || 'no board found'} </h2>
                {showMenu ? (
                  <Image
                    src="src/components/Header/chevron-up-svgrepo-com.svg"
                    alt="chevron"
                    height={4}
                    width={8}
                  />
                ) : (
                  <Image
                    src="src/components/Header/chevron-down-svgrepo-com.svg"
                    alt="chevron"
                    height={4}
                    width={8}
                  />
                )}
              </button>
              <Modal show={showMenu} onClose={() => setShowMenu(!showMenu)}>
                <MobileBoardMenu />
              </Modal>
            </>
          ) : (
            <>
              <div>
                <Image
                  src={theme === 'dark' ? 'light' : 'dark'}
                  alt="kanban-logo"
                  height={25}
                  width={152}
                />
              </div>
              <h2 className="heading-lg ml-5">
                {currentBoard?.name || 'no board found'}{' '}
              </h2>
            </>
          )}
        </AnimatePresence>
      </div>
      <div>
        <AddNewTask />
        <EditButton
          onConfirm={() => deleteBoard(currentBoard.id)}
          type="board"
          className="bottom-0 left-0 -translate-x-full translate-y-28"
        />
      </div>
    </header>
  )
}

export default Header
