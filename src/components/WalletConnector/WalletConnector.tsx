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
        <Wallet className="w-8 h-8 text-secondary-400 mx-auto mb-3" />
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
        className="btn-gradient w-full flex items-center justify-center space-x-3 py-4"
        disabled={isConnecting}
      >
        {isConnecting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Wallet className="w-5 h-5" />
        )}
        <span>
          {isConnecting ? '连接中...' : '连接钱包'}
        </span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 bg-secondary-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowModal(false)}
            />

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-secondary-900">
                  选择钱包
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-secondary-400 hover:text-secondary-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Wallet list */}
              <div className="space-y-3">
                {availableWallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => handleConnect(wallet.name)}
                    disabled={!wallet.isInstalled || isConnecting}
                    className={`wallet-button ${
                      !wallet.isInstalled 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:border-primary-300 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <img
                        src={wallet.logo}
                        alt={`${wallet.name} logo`}
                        className="w-8 h-8 rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDhWMThIMTdWMTZIMTlWMTBIMTdWOEgyMVpNMy41IDZIOFY0SDMuNUM0LjMzIDQgNSA0LjY3IDUgNS41VjE4LjVDNSAxOS4zMyA0LjMzIDIwIDMuNSAyMEgyVjE4SDMuNVY2WiIgZmlsbD0iIzMzNzNkYyIvPgo8L3N2Zz4K'
                        }}
                      />
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
                      <ExternalLink className="w-5 h-5 text-secondary-400" />
                    ) : (
                      <div className="w-3 h-3 bg-success-400 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Help text */}
              <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
                <p className="text-sm text-secondary-600">
                  <strong>新手指南：</strong>
                </p>
                <ul className="text-sm text-secondary-600 mt-2 space-y-1">
                  <li>• Keplr 是推荐的 Cosmos 生态钱包</li>
                  <li>• Test Wallet 仅用于开发测试</li>
                  <li>• 连接钱包后即可开始使用所有功能</li>
                </ul>
              </div>

              {/* Install wallet links */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <a
                  href="https://www.keplr.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 transition-colors flex items-center space-x-1"
                >
                  <span>安装 Keplr</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://wallet.cosmostation.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 transition-colors flex items-center space-x-1"
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
