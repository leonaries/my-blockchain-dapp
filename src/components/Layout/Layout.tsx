import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Page Content */}
        <main className="flex-1 lg:ml-64">
          <div className="p-6 max-w-7xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
