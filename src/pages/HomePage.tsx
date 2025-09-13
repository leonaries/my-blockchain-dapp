import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Coins, 
  Users, 
  ArrowRightLeft, 
  Pickaxe, 
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
      icon: <Pickaxe className="w-8 h-8" />,
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
      icon: <Pickaxe className="w-6 h-6 text-warning-600" />,
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
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient">
            My Blockchain DApp
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            基于 Cosmos SDK 的去中心化应用，提供完整的区块链生态系统功能
          </p>
        </div>

        {/* Wallet Connection */}
        {!connectedWallet ? (
          <div className="max-w-md mx-auto">
            <WalletConnector />
          </div>
        ) : (
          <div className="card max-w-md mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-secondary-900">
                  {connectedWallet.name} 已连接
                </p>
                <p className="text-sm text-secondary-600">
                  {`${connectedWallet.address.slice(0, 10)}...${connectedWallet.address.slice(-8)}`}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary-600">
                  {parseInt(connectedWallet.balance).toLocaleString()} TOKEN
                </p>
                <p className="text-xs text-secondary-500">余额</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="card text-center">
            <div className="flex justify-center mb-3">
              {stat.icon}
            </div>
            <div className="stat-value text-2xl">
              {stat.value}
              {stat.suffix && <span className="text-base ml-1">{stat.suffix}</span>}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            功能特性
          </h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            探索我们完整的区块链功能生态系统，从代币管理到挖矿系统，一应俱全
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className={`card-hover group ${feature.bgColor} border-2 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
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
            </Link>
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 -mx-6 px-6 py-12 rounded-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            技术优势
          </h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            基于最新的区块链技术栈，为用户提供安全、高效、易用的去中心化体验
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-xl shadow-lg">
                  {advantage.icon}
                </div>
              </div>
              <h3 className="font-semibold text-secondary-900">
                {advantage.title}
              </h3>
              <p className="text-sm text-secondary-600 leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-secondary-900">
          准备开始了吗？
        </h2>
        <p className="text-secondary-600 max-w-xl mx-auto">
          连接您的钱包，开始探索去中心化区块链世界的无限可能
        </p>
        
        {!connectedWallet ? (
          <div className="max-w-sm mx-auto">
            <WalletConnector />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/tokens"
              className="btn-gradient px-6 py-3"
            >
              开始使用代币功能
            </Link>
            <Link
              to="/explorer"
              className="btn-secondary px-6 py-3"
            >
              浏览区块链数据
            </Link>
          </div>
        )}
      </section>

      {/* Footer Info */}
      <section className="text-center py-8 border-t border-secondary-200">
        <p className="text-secondary-500 text-sm">
          基于 Cosmos SDK v0.50.1 构建 • 支持 CosmJS 集成 • 兼容 Keplr 钱包
        </p>
        <div className="mt-4 flex justify-center space-x-6">
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
