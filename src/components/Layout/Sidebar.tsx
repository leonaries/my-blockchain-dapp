import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Coins, 
  Users, 
  ArrowRightLeft, 
  Pickaxe, 
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
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
    },
    {
      name: '用户管理',
      href: '/users',
      icon: Users,
      description: '创建新钱包 / 导入助记词 / 显示地址 & 余额',
    },
    {
      name: '代币操作',
      href: '/tokens',
      icon: Coins,
      description: '发币 (mint) / 转账',
    },
    {
      name: '代币转账',
      href: '/transfer',
      icon: ArrowRightLeft,
      description: 'P2P转账 / 批量转账',
    },
    {
      name: '挖矿系统',
      href: '/mining',
      icon: Pickaxe,
      description: '矿工注册 / 挖矿奖励',
    },
    {
      name: '区块浏览',
      href: '/explorer',
      icon: Search,
      description: '查询区块高度 / 查看最新区块交易',
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-secondary-900 bg-opacity-50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 bottom-0 z-40 bg-white/95 backdrop-blur-sm border-r border-secondary-200/50 transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Header */}
        <div className="p-4 border-b border-secondary-200/50">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MB</span>
                </div>
                <span className="font-semibold text-secondary-900">
                  My Blockchain
                </span>
              </Link>
            )}
            
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1 hover:bg-secondary-100 rounded"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isCurrentPage = isActive(item.href)
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200
                  ${isCurrentPage 
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
                    : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                  }
                `}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className={`w-5 h-5 ${isCurrentPage ? 'text-primary-600' : ''}`} />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">
                      {item.name}
                    </div>
                    {item.description && (
                      <div className="text-xs text-secondary-500 mt-0.5 leading-tight">
                        {item.description}
                      </div>
                    )}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-secondary-200/50">
            <div className="text-xs text-secondary-500 text-center">
              <p className="mb-1">Cosmos SDK v0.50.1</p>
              <p>Built with React + TypeScript</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Sidebar
