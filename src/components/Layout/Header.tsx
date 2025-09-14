import React from 'react'
import { Wallet, LogOut, RefreshCcw, Copy, ExternalLink } from 'lucide-react'
import { useWallet } from '@store/WalletContext'
import toast from 'react-hot-toast'

const Header: React.FC = () => {
  const { connectedWallet, disconnectWallet, refreshBalance } = useWallet()

  const copyAddress = async () => {
    if (connectedWallet) {
      await navigator.clipboard.writeText(connectedWallet.address)
      toast.success('地址已复制到剪贴板')
    }
  }

  const handleRefresh = async () => {
    await refreshBalance()
    toast.success('余额已刷新')
  }

  return (
    <header className="bg-gradient-to-r from-primary-700 to-primary-800 text-white shadow-lg lg:pl-64">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Mobile */}
          <div className="lg:hidden">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary-600 font-bold text-sm">MB</span>
              </div>
              <span className="font-semibold text-white">
                My Blockchain
              </span>
            </div>
          </div>

          {/* Network Status */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-white/90">
                mychain-1 (Testnet)
              </span>
            </div>
            
            <div className="h-4 w-px bg-white/20"></div>
            
            <div className="text-sm text-white/90">
              RPC: localhost:26657
            </div>
          </div>

          {/* Wallet Info */}
          {connectedWallet && (
            <div className="flex items-center space-x-3">
              {/* Balance */}
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-white">
                  {parseInt(connectedWallet.balance).toLocaleString()} TOKEN
                </div>
                <div className="text-xs text-white/70">
                  余额
                </div>
              </div>

              {/* Wallet Actions */}
              <div className="flex items-center space-x-2">
                {/* Address */}
                <div className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10">
                  <Wallet className="w-4 h-4 text-white/70" />
                  <span className="text-sm font-mono text-white">
                    {`${connectedWallet.address.slice(0, 8)}...${connectedWallet.address.slice(-6)}`}
                  </span>
                  <button
                    onClick={copyAddress}
                    className="text-white/50 hover:text-white transition-colors"
                    title="复制地址"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>

                {/* Action Buttons */}
                <button
                  onClick={handleRefresh}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="刷新余额"
                >
                  <RefreshCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={disconnectWallet}
                  className="p-2 text-white/70 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors"
                  title="断开连接"
                >
                  <LogOut className="w-4 h-4" />
                </button>

                {/* External Links */}
                <div className="hidden lg:flex items-center space-x-1">
                  <a
                    href="http://localhost:1317"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="REST API"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile wallet info */}
        {connectedWallet && (
          <div className="md:hidden mt-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wallet className="w-4 h-4 text-white/70" />
                <span className="text-sm font-mono text-white">
                  {`${connectedWallet.address.slice(0, 12)}...${connectedWallet.address.slice(-8)}`}
                </span>
                <button
                  onClick={copyAddress}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              <div className="text-sm font-medium text-white">
                {parseInt(connectedWallet.balance).toLocaleString()} TOKEN
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
