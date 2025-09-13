import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import toast from 'react-hot-toast'
import { ConnectedWallet, WalletInfo } from '@types/index'
import { walletService } from '@services/walletService'

interface WalletContextType {
  // Wallet state
  connectedWallet: ConnectedWallet | null
  availableWallets: WalletInfo[]
  isConnecting: boolean
  
  // Wallet actions
  connectWallet: (walletName: string) => Promise<void>
  disconnectWallet: () => Promise<void>
  refreshBalance: () => Promise<void>
  
  // Chain info
  chainId: string
  isTestnet: boolean
}

const WalletContext = createContext<WalletContextType | null>(null)

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet | null>(null)
  const [availableWallets, setAvailableWallets] = useState<WalletInfo[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [chainId] = useState('mychain-1') // Default chain ID
  const [isTestnet] = useState(true)

  // Initialize wallets on mount
  useEffect(() => {
    initializeWallets()
    checkExistingConnection()
  }, [])

  const initializeWallets = async () => {
    try {
      const wallets = await walletService.getAvailableWallets()
      setAvailableWallets(wallets)
    } catch (error) {
      console.error('Failed to initialize wallets:', error)
      toast.error('Failed to detect wallets')
    }
  }

  const checkExistingConnection = async () => {
    try {
      const savedWallet = localStorage.getItem('connectedWallet')
      if (savedWallet) {
        const walletInfo = JSON.parse(savedWallet)
        const isStillConnected = await walletService.checkConnection(walletInfo.name)
        
        if (isStillConnected) {
          const walletData = await walletService.getWalletInfo(walletInfo.name)
          if (walletData) {
            setConnectedWallet(walletData)
          }
        } else {
          localStorage.removeItem('connectedWallet')
        }
      }
    } catch (error) {
      console.error('Error checking existing connection:', error)
      localStorage.removeItem('connectedWallet')
    }
  }

  const connectWallet = async (walletName: string) => {
    if (isConnecting) return
    
    setIsConnecting(true)
    
    try {
      toast.loading('Connecting to wallet...', { id: 'wallet-connect' })
      
      const wallet = await walletService.connectWallet(walletName, chainId)
      
      setConnectedWallet(wallet)
      localStorage.setItem('connectedWallet', JSON.stringify({ name: walletName, address: wallet.address }))
      
      toast.success(`Connected to ${walletName}`, { id: 'wallet-connect' })
    } catch (error: any) {
      console.error('Failed to connect wallet:', error)
      toast.error(error.message || 'Failed to connect wallet', { id: 'wallet-connect' })
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    try {
      if (connectedWallet) {
        await walletService.disconnectWallet(connectedWallet.name)
        setConnectedWallet(null)
        localStorage.removeItem('connectedWallet')
        toast.success('Wallet disconnected')
      }
    } catch (error: any) {
      console.error('Failed to disconnect wallet:', error)
      toast.error(error.message || 'Failed to disconnect wallet')
    }
  }

  const refreshBalance = async () => {
    if (!connectedWallet) return
    
    try {
      const updatedWallet = await walletService.getWalletInfo(connectedWallet.name)
      if (updatedWallet) {
        setConnectedWallet(updatedWallet)
      }
    } catch (error) {
      console.error('Failed to refresh balance:', error)
      toast.error('Failed to refresh balance')
    }
  }

  // Listen for account changes
  useEffect(() => {
    if (connectedWallet) {
      const handleAccountChange = async () => {
        try {
          const updatedWallet = await walletService.getWalletInfo(connectedWallet.name)
          if (updatedWallet && updatedWallet.address !== connectedWallet.address) {
            setConnectedWallet(updatedWallet)
            localStorage.setItem('connectedWallet', JSON.stringify({
              name: connectedWallet.name,
              address: updatedWallet.address
            }))
            toast.info('Account changed')
          }
        } catch (error) {
          console.error('Error handling account change:', error)
        }
      }

      // Set up listeners for account changes
      const interval = setInterval(handleAccountChange, 5000) // Check every 5 seconds
      
      return () => clearInterval(interval)
    }
  }, [connectedWallet])

  const contextValue: WalletContextType = {
    connectedWallet,
    availableWallets,
    isConnecting,
    connectWallet,
    disconnectWallet,
    refreshBalance,
    chainId,
    isTestnet,
  }

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  )
}

export default WalletProvider
