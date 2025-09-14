import React, { useState } from 'react'
import { Wallet, X, ExternalLink, Loader2 } from 'lucide-react'
import { useWallet } from '@store/WalletContext'

const WalletConnector: React.FC = () => {
  const { availableWallets, connectWallet, isConnecting } = useWallet()
  const [showModal, setShowModal] = useState(false)

  const handleConnect = async (walletName: string) => {
    await connectWallet(walletName)
    setShowModal(false)
  }

  if (availableWallets.length === 0) {
    return (
      <div className="card text-center">
        <Wallet className="w-8 h-8 text-primary-400 mx-auto mb-3" />
        <p className="text-secondary-600 mb-4">
          没有检测到可用的钱包
        </p>
        <a
          href="https://www.keplr.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center space-x-2"
        >
          <span>安装 Keplr 钱包</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white w-full flex items-center justify-center space-x-3 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
        disabled={isConnecting}
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></span>
        {isConnecting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Wallet className="w-5 h-5" />
        )}
        <span className="font-medium">
          {isConnecting ? '连接中...' : '连接钱包'}
        </span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 bg-secondary-900 bg-opacity-75 backdrop-blur-sm transition-opacity"
              onClick={() => setShowModal(false)}
            />

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 animate-fade-in">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-secondary-900 flex items-center">
                  <Wallet className="w-5 h-5 mr-2 text-primary-600" />
                  选择钱包
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-secondary-400 hover:text-secondary-600 transition-colors rounded-full hover:bg-secondary-100 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Wallet list */}
              <div className="space-y-3">
                {availableWallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => handleConnect(wallet.name)}
                    disabled={!wallet.isInstalled || isConnecting}
                    className={`flex items-center justify-between w-full p-4 rounded-lg transition-all duration-200 ${
                      !wallet.isInstalled 
                        ? 'bg-gray-100 opacity-60 cursor-not-allowed' 
                        : 'bg-white border border-gray-200 hover:border-primary-300 hover:shadow-lg hover:bg-primary-50/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center p-1">
                        <img
                          src={wallet.logo}
                          alt={`${wallet.name} logo`}
                          className="w-8 h-8 rounded-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDhWMThoLTRWMTZoMlYxMGgtMlY4aDRaTTMuNSA2SDhWNEgzLjVDNC4zMyA0IDUgNC42NyA1IDUuNVYxOC41QzUgMTkuMzMgNC4zMyAyMCAzLjUgMjBIMlYxOGgxLjVWNloiIGZpbGw9IiMzMzczZGMiLz4KPC9zdmc+Cg=='
                          }}
                        />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-secondary-900 flex items-center space-x-2">
                          <span>{wallet.name}</span>
                          {!wallet.isInstalled && (
                            <span className="text-xs bg-warning-100 text-warning-700 px-2 py-0.5 rounded-full">
                              未安装
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-secondary-600">
                          {wallet.description}
                        </p>
                      </div>
                    </div>
                    
                    {isConnecting ? (
                      <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
                    ) : !wallet.isInstalled ? (
                      <div className="flex items-center space-x-1 text-xs text-primary-600">
                        <span>安装</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    ) : (
                      <div className="w-3 h-3 bg-success-400 rounded-full ring-2 ring-success-100"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Help text */}
              <div className="mt-6 p-4 bg-primary-50/50 rounded-lg border border-primary-100">
                <p className="text-sm font-medium text-primary-700">
                  新手指南：
                </p>
                <ul className="text-sm text-primary-600 mt-2 space-y-1">
                  <li className="flex items-start">
                    <span className="mr-1">•</span>
                    <span>Keplr 是推荐的 Cosmos 生态钱包</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-1">•</span>
                    <span>Test Wallet 仅用于开发测试</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-1">•</span>
                    <span>连接钱包后即可开始使用所有功能</span>
                  </li>
                </ul>
              </div>

              {/* Install wallet links */}
              <div className="mt-4 flex flex-wrap gap-3 justify-center">
                <a
                  href="https://www.keplr.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-white border border-primary-200 text-primary-600 hover:bg-primary-50 px-3 py-1.5 rounded-md transition-colors flex items-center space-x-1"
                >
                  <span>安装 Keplr</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://wallet.cosmostation.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-white border border-primary-200 text-primary-600 hover:bg-primary-50 px-3 py-1.5 rounded-md transition-colors flex items-center space-x-1"
                >
                  <span>安装 Cosmostation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WalletConnector
