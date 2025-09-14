import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Coins, 
  Users, 
  ArrowRightLeft, 
  Hammer, 
  Search,
  Wallet,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  ChevronRight
} from 'lucide-react'

import { useWallet } from '@store/WalletContext'
import WalletConnector from '@components/WalletConnector/WalletConnector'

const HomePage: React.FC = () => {
  const { connectedWallet } = useWallet()

  const features = [
    {
      icon: <Coins className="w-8 h-8" />,
      title: '代币铸造',
      description: '发行和管理自定义代币，支持铸造和销毁功能',
      link: '/tokens',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50 border-yellow-200',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '用户管理',
      description: '创建和管理用户档案，支持个人信息和头像设置',
      link: '/users',
      color: 'from-blue-400 to-purple-500',
      bgColor: 'bg-blue-50 border-blue-200',
    },
    {
      icon: <ArrowRightLeft className="w-8 h-8" />,
      title: '代币转账',
      description: 'P2P 转账和批量转账，查看转账历史和统计',
      link: '/transfer',
      color: 'from-green-400 to-teal-500',
      bgColor: 'bg-green-50 border-green-200',
    },
    {
      icon: <Hammer className="w-8 h-8" />,
      title: '挖矿系统',
      description: '注册矿工，参与挖矿获得奖励，查看算力统计',
      link: '/mining',
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50 border-purple-200',
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: '区块浏览器',
      description: '查看区块信息、交易详情和网络状态',
      link: '/explorer',
      color: 'from-indigo-400 to-cyan-500',
      bgColor: 'bg-indigo-50 border-indigo-200',
    },
  ]

  const stats = [
    {
      icon: <TrendingUp className="w-6 h-6 text-primary-600" />,
      label: '总交易量',
      value: '1,234,567',
      suffix: 'TOKEN',
    },
    {
      icon: <Users className="w-6 h-6 text-success-600" />,
      label: '活跃用户',
      value: '5,678',
      suffix: '人',
    },
    {
      icon: <Hammer className="w-6 h-6 text-warning-600" />,
      label: '活跃矿工',
      value: '123',
      suffix: '个',
    },
    {
      icon: <Shield className="w-6 h-6 text-error-600" />,
      label: '区块高度',
      value: '999,999',
      suffix: '',
    },
  ]

  const advantages = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: '高性能',
      description: '基于 Cosmos SDK 构建，支持高吞吐量交易处理',
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: '安全可靠',
      description: '采用 Tendermint 共识算法，确保网络安全性',
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      title: '互操作性',
      description: '支持 IBC 协议，可与其他区块链网络互联',
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: '用户友好',
      description: '简洁直观的界面设计，支持多种钱包连接',
    },
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section - 水平布局 */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
            My Blockchain DApp
          </h1>
            <p className="text-xl text-secondary-600">
            基于 Cosmos SDK 的去中心化应用，提供完整的区块链生态系统功能
          </p>
        </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/tokens" className="btn-gradient px-6 py-3">
              开始使用
            </Link>
            <Link to="/explorer" className="btn-secondary px-6 py-3">
              浏览区块链
            </Link>
          </div>
        </div>
        
        <div className="relative">
          {/* 装饰背景元素 */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-primary-300/20 to-secondary-300/20 rounded-full blur-3xl"></div>
          
          {/* 钱包连接卡片 */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-8 transform hover:scale-105 transition-transform duration-300">
        {!connectedWallet ? (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mt-4 text-secondary-900">连接钱包</h3>
                  <p className="text-secondary-600 mt-2">连接您的钱包以访问完整功能</p>
                </div>
            <WalletConnector />
          </div>
        ) : (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
              </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary-900">
                  {connectedWallet.name} 已连接
                    </h3>
                    <p className="text-sm text-secondary-600 font-mono">
                  {`${connectedWallet.address.slice(0, 10)}...${connectedWallet.address.slice(-8)}`}
                </p>
              </div>
                </div>
                
                <div className="bg-secondary-50 rounded-lg p-4 flex justify-between items-center">
                  <span className="text-secondary-600">余额</span>
                  <span className="font-semibold text-xl text-primary-600">
                  {parseInt(connectedWallet.balance).toLocaleString()} TOKEN
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <Link to="/tokens" className="btn-primary flex-1 py-2 text-center">
                    发送
                  </Link>
                  <Link to="/explorer" className="btn-secondary flex-1 py-2 text-center">
                    查看交易
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Statistics - 水平卡片 */}
      <section className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
            <div key={index} className="text-center">
            <div className="flex justify-center mb-3">
              {stat.icon}
            </div>
              <div className="text-2xl font-bold text-secondary-900">
              {stat.value}
              {stat.suffix && <span className="text-base ml-1">{stat.suffix}</span>}
            </div>
              <div className="text-sm text-secondary-500 uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
        </div>
      </section>

      {/* Features + Advantages - 水平分栏布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：功能特性 */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-secondary-900 mb-2 flex items-center">
              <span className="w-2 h-8 bg-primary-500 rounded-full mr-3"></span>
            功能特性
          </h2>
            <p className="text-secondary-600 max-w-2xl">
            探索我们完整的区块链功能生态系统，从代币管理到挖矿系统，一应俱全
          </p>
        </div>

          <div className="grid sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
                className={`card-hover group ${feature.bgColor} border hover:shadow-xl transition-all duration-300 overflow-hidden relative`}
            >
                <div className="flex items-start p-5">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                  <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-secondary-900">
                      {feature.title}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-secondary-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <p className="text-secondary-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
                {/* 底部装饰 */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
            </Link>
          ))}
          </div>
        </div>

        {/* 右侧：技术优势 */}
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">技术优势</h2>
            <p className="text-secondary-600 text-sm">
            基于最新的区块链技术栈，为用户提供安全、高效、易用的去中心化体验
          </p>
        </div>

          <div className="space-y-6">
          {advantages.map((advantage, index) => (
              <div key={index} className="flex items-start">
                <div className="p-3 bg-white rounded-xl shadow-md mr-4">
                  {advantage.icon}
                </div>
                <div>
              <h3 className="font-semibold text-secondary-900">
                {advantage.title}
              </h3>
                  <p className="text-sm text-secondary-600 leading-relaxed mt-1">
                {advantage.description}
              </p>
                </div>
            </div>
          ))}
          </div>
          
          {/* CTA 按钮 */}
          <div className="mt-8">
            <Link
              to="/explorer"
              className="block w-full bg-white text-center py-3 rounded-lg shadow-md border border-gray-200 text-primary-600 hover:bg-primary-50 transition-colors"
            >
              了解更多技术细节
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <section className="border-t border-secondary-200 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-secondary-500 text-sm mb-4 md:mb-0">
          基于 Cosmos SDK v0.50.1 构建 • 支持 CosmJS 集成 • 兼容 Keplr 钱包
        </p>
        <div className="flex space-x-6">
          <a
            href="https://github.com/leonaries/my-blockchain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-500 hover:text-primary-600 text-sm transition-colors"
          >
            区块链源码
          </a>
          <a
            href="https://github.com/leonaries/my-blockchain-dapp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-500 hover:text-primary-600 text-sm transition-colors"
          >
            前端源码
          </a>
          <a
            href="http://localhost:1317"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-500 hover:text-primary-600 text-sm transition-colors"
          >
            REST API
          </a>
        </div>
      </section>
    </div>
  )
}

export default HomePage
