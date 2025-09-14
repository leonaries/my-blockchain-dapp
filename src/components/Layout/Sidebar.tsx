import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Coins, 
  Users, 
  ArrowRightLeft, 
  Hammer, 
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Zap,
  Activity
} from 'lucide-react'

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    {
      name: '首页',
      href: '/',
      icon: Home,
      color: 'from-purple-500 to-blue-500',
    },
    {
      name: '用户管理',
      href: '/users',
      icon: Users,
      description: '钱包管理 • 地址 • 余额',
      color: 'from-green-500 to-teal-500',
    },
    {
      name: '代币操作',
      href: '/tokens',
      icon: Coins,
      description: '发币 • 转账 • 管理',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      name: '代币转账',
      href: '/transfer',
      icon: ArrowRightLeft,
      description: 'P2P转账 • 批量操作',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      name: '挖矿系统',
      href: '/mining',
      icon: Hammer,
      description: '矿工注册 • 挖矿奖励',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: '区块浏览',
      href: '/explorer',
      icon: Search,
      description: '区块查询 • 交易历史',
      color: 'from-indigo-500 to-purple-500',
    },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 glass hover:glass-hover rounded-xl text-white shadow-glass"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 shadow-2xl
        ${isCollapsed ? 'w-20' : 'w-72'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* 玻璃态背景 */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-r border-white/10"></div>
        
        {/* 装饰性光效 */}
        <div className="absolute top-1/4 left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl"></div>

        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <Link to="/" className="flex items-center space-x-3 group">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      BlockchainDApp
                    </div>
                    <div className="text-xs text-gray-400">Web3 • DeFi</div>
                  </div>
                </Link>
              )}
              
              {isCollapsed && (
                <Link to="/" className="group">
                  <div className="relative mx-auto">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                  </div>
                </Link>
              )}
              
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex p-2 hover:bg-white/10 rounded-xl text-white transition-all duration-200 group"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4 group-hover:text-purple-400" />
                ) : (
                  <ChevronLeft className="w-4 h-4 group-hover:text-purple-400" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 scrollbar-modern overflow-y-auto">
            {navigation.map((item, index) => {
              const isCurrentPage = isActive(item.href)
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    group relative flex items-center rounded-xl transition-all duration-300 overflow-hidden
                    ${isCollapsed ? 'p-3 justify-center' : 'p-4'}
                    ${isCurrentPage 
                      ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-400/30 shadow-glow' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }
                  `}
                  title={isCollapsed ? item.name : undefined}
                >
                  {/* 背景光效 */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300
                    ${item.color}
                  `}></div>
                  
                  {/* 激活指示器 */}
                  {isCurrentPage && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-r-full"></div>
                  )}

                  {/* 图标容器 */}
                  <div className={`
                    relative flex items-center justify-center rounded-lg transition-all duration-300
                    ${isCollapsed ? 'w-8 h-8' : 'w-10 h-10 mr-4'}
                    ${isCurrentPage 
                      ? `bg-gradient-to-br ${item.color} shadow-lg` 
                      : 'bg-white/5 group-hover:bg-white/10'
                    }
                  `}>
                    <Icon className={`w-5 h-5 ${isCurrentPage ? 'text-white' : 'group-hover:scale-110'} transition-transform duration-300`} />
                  </div>
                  
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold text-sm mb-1 transition-colors duration-300 ${
                        isCurrentPage ? 'text-white' : 'group-hover:text-white'
                      }`}>
                        {item.name}
                      </div>
                      {item.description && (
                        <div className="text-xs text-gray-400 leading-tight">
                          {item.description}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Hover效果 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Link>
              )
            })}
          </nav>

          {/* Network Status */}
          {!isCollapsed && (
            <div className="p-4 border-t border-white/10">
              <div className="glass rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-white">网络状态</span>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">链ID:</span>
                    <span className="text-white font-mono">mychain-1</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">类型:</span>
                    <span className="text-green-300">Testnet</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">节点:</span>
                    <span className="text-cyan-300">已连接</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          {!isCollapsed && (
            <div className="p-4 border-t border-white/10">
              <div className="text-xs text-gray-500 text-center space-y-1">
                <p className="flex items-center justify-center space-x-1">
                  <span>Powered by</span>
                  <span className="text-gradient font-semibold">Cosmos SDK</span>
                </p>
                <p>v0.50.1 • React • TypeScript</p>
              </div>
            </div>
          )}

          {/* 折叠状态的网络指示器 */}
          {isCollapsed && (
            <div className="p-4 border-t border-white/10 flex justify-center">
              <div className="w-8 h-8 glass rounded-xl flex items-center justify-center">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 左侧边栏占位符 (桌面端) */}
      <div className={`hidden lg:block transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}></div>
    </>
  )
}

export default Sidebar