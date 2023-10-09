import Board from '@/components/Board'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useState } from 'react'

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(true)
  return (
    <div>
      <Header sidebarVisible={setShowSidebar} />
      <div>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Board />
      </div>
    </div>
  )
}
