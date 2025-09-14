import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Layout Components
import Layout from '@components/Layout/Layout'
import Navbar from '@components/Layout/Navbar' // 导入Navbar组件

// Page Components
import HomePage from '@pages/HomePage'
import UserManagementPage from '@pages/UserManagementPage'
import TokenPage from '@pages/TokenPage'
import TransferPage from '@pages/TransferPage'
import MiningPage from '@pages/MiningPage'
import ExplorerPage from '@pages/ExplorerPage'

// Wallet Provider
import { WalletProvider } from '@store/WalletContext'

function App() {
  return (
    <WalletProvider>
      <div className="min-h-screen relative overflow-hidden">
        {/* 现代Web3背景层 */}
        <div className="fixed inset-0 -z-10">
          {/* 主背景渐变 */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"></div>
          
          {/* 动态光效背景 */}
          <div className="absolute inset-0">
            {/* 主要光晕效果 */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
            
            {/* 辅助光效 */}
            <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl animate-float"></div>
            <div className="absolute bottom-1/3 right-1/2 w-48 h-48 bg-green-500/10 rounded-full blur-2xl animate-float delay-3000"></div>
          </div>
          
          {/* 网格背景效果 */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" 
                 style={{
                   backgroundImage: `
                     linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                   `,
                   backgroundSize: '50px 50px'
                 }}>
            </div>
          </div>
          
          {/* 动态粒子效果 */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${6 + Math.random() * 4}s`
                }}
              >
                <div 
                  className="w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                  style={{
                    filter: 'blur(0.5px)',
                    boxShadow: '0 0 6px rgba(139, 92, 246, 0.8)'
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="relative z-10">
          {/* 直接使用Navbar组件 */}
          <Navbar />
          
          <div className="pt-16"> {/* 添加顶部间距，为导航栏留出空间 */}
            <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              {/* 主内容卡片 */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 min-h-[calc(100vh-12rem)] relative">
                {/* 内容区域装饰光效 */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-xl"></div>
                
                {/* 页面内容 */}
                <div className="relative z-10">
                  <Routes>
                    {/* Home Page */}
                    <Route path="/" element={<HomePage />} />
                    
                    {/* Feature Pages */}
                    <Route path="users" element={<UserManagementPage />} />
                    <Route path="tokens" element={<TokenPage />} />
                    <Route path="transfer" element={<TransferPage />} />
                    <Route path="mining" element={<MiningPage />} />
                    <Route path="explorer" element={<ExplorerPage />} />
                    
                    {/* Redirect unknown routes to home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部装饰效果 */}
        <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none -z-5"></div>
      </div>
    </WalletProvider>
  )
}

export default App