import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Navbar from './Navbar'

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen relative bg-gray-50">
      {/* 导航栏 */}
      <Navbar />
      
      {/* Main Content */}
      <div className="pt-16"> {/* 添加顶部间距，为导航栏留出空间 */}
        {/* Page Content */}
        <main className="flex-1">
          <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* 主内容卡片 */}
            <div className="card min-h-[calc(100vh-12rem)] relative">
              {/* 内容区域装饰光效 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-xl"></div>
              
              {/* 页面内容 */}
              <div className="relative z-10">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout