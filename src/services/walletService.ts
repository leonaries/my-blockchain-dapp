import { StargateClient, SigningStargateClient } from '@cosmjs/stargate'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { stringToPath } from '@cosmjs/crypto'
import { WalletInfo, ConnectedWallet, ChainConfig } from '@types/index'

// Chain configuration
const CHAIN_CONFIG: ChainConfig = {
  chainId: 'mychain-1',
  chainName: 'My Blockchain',
  rpc: 'http://localhost:26657',
  rest: 'http://localhost:1317',
  bech32Prefix: 'myblockchain',
  coinDenom: 'token',
  coinDecimals: 6,
  gasPrices: '0.025token',
}

class WalletService {
  private stargateClient: StargateClient | null = null
  private signingClient: SigningStargateClient | null = null

  constructor() {
    this.initializeClient()
  }

  private async initializeClient() {
    try {
      this.stargateClient = await StargateClient.connect(CHAIN_CONFIG.rpc)
    } catch (error) {
      console.warn('Could not connect to blockchain RPC:', error)
    }
  }

  // Get available wallets
  async getAvailableWallets(): Promise<WalletInfo[]> {
    const wallets: WalletInfo[] = []

    // Check for Keplr wallet
    if (window.keplr) {
      wallets.push({
        name: 'Keplr',
        logo: 'https://wallet.keplr.app/keplr-brand-assets/keplr-logo.svg',
        description: 'Keplr is a browser extension wallet for Cosmos-based blockchains',
        isInstalled: true,
        isConnected: false,
      })
    }

    // Check for Cosmostation wallet
    if (window.cosmostation) {
      wallets.push({
        name: 'Cosmostation',
        logo: 'https://wallet.cosmostation.io/favicon.ico',
        description: 'Cosmostation is a non-custodial wallet for Cosmos ecosystem',
        isInstalled: true,
        isConnected: false,
      })
    }

    // Add test wallet option for development
    wallets.push({
      name: 'Test Wallet',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDhWMThIMTdWMTZIMTlWMTBIMTdWOEgyMVpNMy41IDZIOFY0SDMuNUM0LjMzIDQgNSA0LjY3IDUgNS41VjE4LjVDNSAxOS4zMyA0LjMzIDIwIDMuNSAyMEgyVjE4SDMuNVY2WiIgZmlsbD0iIzMzNzNkYyIvPgo8L3N2Zz4K',
      description: 'Test wallet for development purposes',
      isInstalled: true,
      isConnected: false,
    })

    return wallets
  }

  // Connect to a specific wallet
  async connectWallet(walletName: string, chainId: string): Promise<ConnectedWallet> {
    switch (walletName) {
      case 'Keplr':
        return this.connectKeplr(chainId)
      case 'Cosmostation':
        return this.connectCosmostation(chainId)
      case 'Test Wallet':
        return this.connectTestWallet(chainId)
      default:
        throw new Error(`Unsupported wallet: ${walletName}`)
    }
  }

  // Connect Keplr wallet
  private async connectKeplr(chainId: string): Promise<ConnectedWallet> {
    if (!window.keplr) {
      throw new Error('Keplr wallet not installed')
    }

    try {
      // Suggest the chain to Keplr
      await window.keplr.experimentalSuggestChain({
        chainId: CHAIN_CONFIG.chainId,
        chainName: CHAIN_CONFIG.chainName,
        rpc: CHAIN_CONFIG.rpc,
        rest: CHAIN_CONFIG.rest,
        bip44: { coinType: 118 },
        bech32Config: {
          bech32PrefixAccAddr: CHAIN_CONFIG.bech32Prefix,
          bech32PrefixAccPub: `${CHAIN_CONFIG.bech32Prefix}pub`,
          bech32PrefixValAddr: `${CHAIN_CONFIG.bech32Prefix}valoper`,
          bech32PrefixValPub: `${CHAIN_CONFIG.bech32Prefix}valoperpub`,
          bech32PrefixConsAddr: `${CHAIN_CONFIG.bech32Prefix}valcons`,
          bech32PrefixConsPub: `${CHAIN_CONFIG.bech32Prefix}valconspub`,
        },
        currencies: [{
          coinDenom: CHAIN_CONFIG.coinDenom.toUpperCase(),
          coinMinimalDenom: CHAIN_CONFIG.coinDenom,
          coinDecimals: CHAIN_CONFIG.coinDecimals,
        }],
        feeCurrencies: [{
          coinDenom: CHAIN_CONFIG.coinDenom.toUpperCase(),
          coinMinimalDenom: CHAIN_CONFIG.coinDenom,
          coinDecimals: CHAIN_CONFIG.coinDecimals,
          gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.04,
          },
        }],
        stakeCurrency: {
          coinDenom: CHAIN_CONFIG.coinDenom.toUpperCase(),
          coinMinimalDenom: CHAIN_CONFIG.coinDenom,
          coinDecimals: CHAIN_CONFIG.coinDecimals,
        },
      })

      // Enable the chain
      await window.keplr.enable(chainId)

      // Get the offline signer
      const offlineSigner = window.getOfflineSigner!(chainId)
      const accounts = await offlineSigner.getAccounts()
      
      if (accounts.length === 0) {
        throw new Error('No accounts found in Keplr')
      }

      const address = accounts[0].address
      const balance = await this.getBalance(address)

      return {
        name: 'Keplr',
        address,
        balance,
        chainId,
      }
    } catch (error: any) {
      throw new Error(`Failed to connect to Keplr: ${error.message}`)
    }
  }

  // Connect Cosmostation wallet
  private async connectCosmostation(chainId: string): Promise<ConnectedWallet> {
    if (!window.cosmostation) {
      throw new Error('Cosmostation wallet not installed')
    }

    try {
      const account = await window.cosmostation.providers.keplr.getKey(chainId)
      const balance = await this.getBalance(account.bech32Address)

      return {
        name: 'Cosmostation',
        address: account.bech32Address,
        balance,
        chainId,
      }
    } catch (error: any) {
      throw new Error(`Failed to connect to Cosmostation: ${error.message}`)
    }
  }

  // Connect test wallet (for development)
  private async connectTestWallet(chainId: string): Promise<ConnectedWallet> {
    try {
      // Create a test wallet with a mnemonic
      const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art'
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix: CHAIN_CONFIG.bech32Prefix,
      })

      const accounts = await wallet.getAccounts()
      if (accounts.length === 0) {
        throw new Error('Failed to create test account')
      }

      const address = accounts[0].address
      const balance = await this.getBalance(address)

      // Store the test wallet for signing
      this.signingClient = await SigningStargateClient.connectWithSigner(
        CHAIN_CONFIG.rpc,
        wallet,
        {
          gasPrice: { denom: CHAIN_CONFIG.coinDenom, amount: '0.025' },
        }
      )

      return {
        name: 'Test Wallet',
        address,
        balance,
        chainId,
      }
    } catch (error: any) {
      throw new Error(`Failed to create test wallet: ${error.message}`)
    }
  }

  // Get wallet balance
  private async getBalance(address: string): Promise<string> {
    if (!this.stargateClient) {
      await this.initializeClient()
    }

    if (!this.stargateClient) {
      return '0'
    }

    try {
      const balances = await this.stargateClient.getAllBalances(address)
      const tokenBalance = balances.find(b => b.denom === CHAIN_CONFIG.coinDenom)
      return tokenBalance ? tokenBalance.amount : '0'
    } catch (error) {
      console.error('Error fetching balance:', error)
      return '0'
    }
  }

  // Check if wallet is still connected
  async checkConnection(walletName: string): Promise<boolean> {
    try {
      switch (walletName) {
        case 'Keplr':
          return !!(window.keplr && await window.keplr.getKey(CHAIN_CONFIG.chainId))
        case 'Cosmostation':
          return !!(window.cosmostation && await window.cosmostation.providers.keplr.getKey(CHAIN_CONFIG.chainId))
        case 'Test Wallet':
          return true // Test wallet is always available
        default:
          return false
      }
    } catch (error) {
      return false
    }
  }

  // Get updated wallet info
  async getWalletInfo(walletName: string): Promise<ConnectedWallet | null> {
    try {
      switch (walletName) {
        case 'Keplr':
          if (window.keplr) {
            const key = await window.keplr.getKey(CHAIN_CONFIG.chainId)
            const balance = await this.getBalance(key.bech32Address)
            return {
              name: 'Keplr',
              address: key.bech32Address,
              balance,
              chainId: CHAIN_CONFIG.chainId,
            }
          }
          break
        case 'Cosmostation':
          if (window.cosmostation) {
            const key = await window.cosmostation.providers.keplr.getKey(CHAIN_CONFIG.chainId)
            const balance = await this.getBalance(key.bech32Address)
            return {
              name: 'Cosmostation',
              address: key.bech32Address,
              balance,
              chainId: CHAIN_CONFIG.chainId,
            }
          }
          break
        case 'Test Wallet':
          // Test wallet info should be recreated
          return this.connectTestWallet(CHAIN_CONFIG.chainId)
      }
      return null
    } catch (error) {
      console.error('Error getting wallet info:', error)
      return null
    }
  }

  // Disconnect wallet
  async disconnectWallet(walletName: string): Promise<void> {
    // Most wallets don't have a programmatic disconnect method
    // This is handled by the user through the wallet extension
    console.log(`Disconnecting ${walletName}`)
  }

  // Get signing client for transactions
  async getSigningClient(walletName: string): Promise<SigningStargateClient> {
    switch (walletName) {
      case 'Keplr':
        if (!window.keplr) {
          throw new Error('Keplr wallet not found')
        }
        const offlineSigner = window.getOfflineSigner!(CHAIN_CONFIG.chainId)
        return SigningStargateClient.connectWithSigner(CHAIN_CONFIG.rpc, offlineSigner, {
          gasPrice: { denom: CHAIN_CONFIG.coinDenom, amount: '0.025' },
        })
      
      case 'Test Wallet':
        if (this.signingClient) {
          return this.signingClient
        }
        throw new Error('Test wallet not initialized')
      
      default:
        throw new Error(`Signing not supported for ${walletName}`)
    }
  }
}

// Extend window object for wallet types
declare global {
  interface Window {
    keplr?: {
      enable: (chainId: string) => Promise<void>
      getKey: (chainId: string) => Promise<any>
      experimentalSuggestChain: (chainInfo: any) => Promise<void>
    }
    cosmostation?: {
      providers: {
        keplr: {
          getKey: (chainId: string) => Promise<any>
        }
      }
    }
    getOfflineSigner?: (chainId: string) => any
  }
}

export const walletService = new WalletService()
export default WalletService
