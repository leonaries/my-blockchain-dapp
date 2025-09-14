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
  ChevronDown,
  Zap,
  Activity
} from 'lucide-react'

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
    <nav className="relative z-50">
      {/* 主导航栏 - 横向布局 */}
      <div className="bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
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
            </div>
            
            {/* 桌面导航链接 */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const isCurrentPage = isActive(item.href)
                const Icon = item.icon
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      group relative px-3 py-2 rounded-lg transition-all duration-300
                      ${isCurrentPage 
                        ? 'bg-white/10 text-white' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-2">
                      {/* 图标容器 */}
                      <div className={`
                        flex items-center justify-center rounded-lg transition-all duration-300 w-8 h-8
                        ${isCurrentPage 
                          ? `bg-gradient-to-br ${item.color} shadow-lg` 
                          : 'bg-white/5 group-hover:bg-white/10'
                        }
                      `}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                    
                    {/* 激活指示器 - 底部线条 */}
                    {isCurrentPage && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400"></div>
                    )}
                  </Link>
                )
              })}
            </div>
            
            {/* 网络状态指示器 */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-white/10 rounded-lg px-3 py-1.5 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-green-400" />
                <div className="text-xs text-white">
                  <span className="font-mono">mychain-1</span>
                  <span className="mx-1.5 text-gray-400">|</span>
                  <span className="text-green-300">已连接</span>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* 移动端菜单按钮 */}
            <div className="md:hidden">
              <button
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 移动端菜单 */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute inset-x-0 top-16 bg-gray-900/95 backdrop-blur-xl border-b border-white/10 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const isCurrentPage = isActive(item.href)
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-2 rounded-lg transition-all duration-300
                    ${isCurrentPage 
                      ? 'bg-white/10 text-white border-l-2 border-purple-400' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {/* 图标容器 */}
                  <div className={`
                    flex items-center justify-center rounded-lg transition-all duration-300 w-8 h-8 mr-3
                    ${isCurrentPage 
                      ? `bg-gradient-to-br ${item.color} shadow-lg` 
                      : 'bg-white/5 group-hover:bg-white/10'
                    }
                  `}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  
                  <div>
                    <div className="font-medium text-sm">{item.name}</div>
                    {item.description && (
                      <div className="text-xs text-gray-400">{item.description}</div>
                    )}
                  </div>
                </Link>
              )
            })}
            
            {/* 移动端网络状态 */}
            <div className="mt-4 px-3 py-2">
              <div className="bg-white/10 rounded-lg p-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-white">网络状态</span>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className="text-gray-400">链ID:</div>
                  <div className="text-white font-mono">mychain-1</div>
                  <div className="text-gray-400">类型:</div>
                  <div className="text-green-300">Testnet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar 