import React from 'react'
import { Wallet, LogOut, RefreshCcw, Copy, ExternalLink, Zap, Signal } from 'lucide-react'
import { useWallet } from '@store/WalletContext'
import toast from 'react-hot-toast'

const Header: React.FC = () => {
  const { connectedWallet, disconnectWallet, refreshBalance } = useWallet()

  const copyAddress = async () => {
    if (connectedWallet) {
      await navigator.clipboard.writeText(connectedWallet.address)
      toast.success('地址已复制到剪贴板', {
        style: {
          background: 'rgba(16, 185, 129, 0.1)',
          color: '#ffffff',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          backdropFilter: 'blur(12px)',
        },
      })
    }
  }

  const handleRefresh = async () => {
    await refreshBalance()
    toast.success('余额已刷新', {
      style: {
        background: 'rgba(139, 92, 246, 0.1)',
        color: '#ffffff',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        backdropFilter: 'blur(12px)',
      },
    })
  }

  return (
    <header className="sticky top-0 z-50 lg:pl-64">
      {/* 玻璃态背景 */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-md border-b border-white/10"></div>
      
      {/* 动态背景粒子效果 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -top-2 right-10 w-16 h-16 bg-blue-500/10 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute -bottom-2 left-20 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Mobile */}
          <div className="lg:hidden">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
              </div>
              <div>
                <span className="font-bold text-white text-lg bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  BlockchainDApp
                </span>
                <div className="text-xs text-gray-300">Web3 • DeFi</div>
              </div>
            </div>
          </div>

          {/* Network Status - Enhanced */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <div className="relative flex items-center">
                <Signal className="w-4 h-4 text-green-400 mr-2" />
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-sm">
                <span className="text-white font-medium">mychain-1</span>
                <span className="text-green-300 ml-2 text-xs">Testnet</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-300 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10 font-mono">
              localhost:26657
            </div>
          </div>

          {/* Wallet Info - Modernized */}
          {connectedWallet && (
            <div className="flex items-center space-x-4">
              {/* Balance Card */}
              <div className="hidden sm:block">
                <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"></div>
                    <div>
                      <div className="text-lg font-bold text-white">
                        {parseInt(connectedWallet.balance).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-300 -mt-1">TOKEN 余额</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wallet Actions */}
              <div className="flex items-center space-x-2">
                {/* Address Display */}
                <div className="hidden md:flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-mono text-white">
                      {`${connectedWallet.address.slice(0, 6)}...${connectedWallet.address.slice(-4)}`}
                    </div>
                    <div className="text-xs text-green-300">已连接</div>
                  </div>
                  <button
                    onClick={copyAddress}
                    className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                    title="复制地址"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {/* Action Buttons - Glass Effect */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleRefresh}
                    className="relative group p-3 bg-white/5 backdrop-blur-sm hover:bg-purple-500/20 border border-white/10 hover:border-purple-400/30 rounded-xl transition-all duration-200 overflow-hidden"
                    title="刷新余额"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <RefreshCcw className="w-4 h-4 text-white relative z-10" />
                  </button>

                  <button
                    onClick={disconnectWallet}
                    className="relative group p-3 bg-white/5 backdrop-blur-sm hover:bg-red-500/20 border border-white/10 hover:border-red-400/30 rounded-xl transition-all duration-200 overflow-hidden"
                    title="断开连接"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <LogOut className="w-4 h-4 text-white relative z-10" />
                  </button>

                  {/* External Link */}
                  <a
                    href="http://localhost:1317"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden lg:block relative group p-3 bg-white/5 backdrop-blur-sm hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/30 rounded-xl transition-all duration-200 overflow-hidden"
                    title="REST API"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/0 via-cyan-600/10 to-cyan-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <ExternalLink className="w-4 h-4 text-white relative z-10" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile wallet info - Enhanced */}
        {connectedWallet && (
          <div className="md:hidden mt-4">
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-mono text-white">
                      {`${connectedWallet.address.slice(0, 8)}...${connectedWallet.address.slice(-6)}`}
                    </div>
                    <div className="text-xs text-green-300">钱包已连接</div>
                  </div>
                  <button
                    onClick={copyAddress}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">
                    {parseInt(connectedWallet.balance).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-300">TOKEN</div>
                </div>
              </div>
              
              {/* Mobile Network Status */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-white">mychain-1</span>
                  <span className="text-xs text-green-300">Testnet</span>
                </div>
                <div className="text-xs text-gray-300 font-mono">localhost:26657</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header