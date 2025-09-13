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
    <header className="bg-white/80 backdrop-blur-sm border-b border-secondary-200/50 lg:pl-64">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Mobile */}
          <div className="lg:hidden">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MB</span>
              </div>
              <span className="font-semibold text-secondary-900">
                My Blockchain
              </span>
            </div>
          </div>

          {/* Network Status */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-400 rounded-full"></div>
              <span className="text-sm text-secondary-600">
                mychain-1 (Testnet)
              </span>
            </div>
            
            <div className="h-4 w-px bg-secondary-300"></div>
            
            <div className="text-sm text-secondary-600">
              RPC: localhost:26657
            </div>
          </div>

          {/* Wallet Info */}
          {connectedWallet && (
            <div className="flex items-center space-x-3">
              {/* Balance */}
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-secondary-900">
                  {parseInt(connectedWallet.balance).toLocaleString()} TOKEN
                </div>
                <div className="text-xs text-secondary-500">
                  余额
                </div>
              </div>

              {/* Wallet Actions */}
              <div className="flex items-center space-x-2">
                {/* Address */}
                <div className="hidden md:flex items-center space-x-2 bg-secondary-50 px-3 py-2 rounded-lg">
                  <Wallet className="w-4 h-4 text-secondary-500" />
                  <span className="text-sm font-mono text-secondary-700">
                    {`${connectedWallet.address.slice(0, 8)}...${connectedWallet.address.slice(-6)}`}
                  </span>
                  <button
                    onClick={copyAddress}
                    className="text-secondary-400 hover:text-secondary-600 transition-colors"
                    title="复制地址"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>

                {/* Action Buttons */}
                <button
                  onClick={handleRefresh}
                  className="p-2 text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
                  title="刷新余额"
                >
                  <RefreshCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={disconnectWallet}
                  className="p-2 text-secondary-500 hover:text-error-600 hover:bg-error-50 rounded-lg transition-colors"
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
                    className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
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
          <div className="md:hidden mt-3 p-3 bg-secondary-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wallet className="w-4 h-4 text-secondary-500" />
                <span className="text-sm font-mono text-secondary-700">
                  {`${connectedWallet.address.slice(0, 12)}...${connectedWallet.address.slice(-8)}`}
                </span>
                <button
                  onClick={copyAddress}
                  className="text-secondary-400 hover:text-secondary-600 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              <div className="text-sm font-medium text-secondary-900">
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
