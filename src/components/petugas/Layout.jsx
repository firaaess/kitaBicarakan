import React from 'react'
import SideBar from './Sidebar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideBar /> {/* Sidebar di kiri */}
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet /> {/* Konten dinamis berdasarkan route */}
      </div>
    </div>
  )
}

export default Layout
