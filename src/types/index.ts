// Wallet Types
export interface WalletInfo {
  name: string
  logo: string
  description: string
  isInstalled: boolean
  isConnected: boolean
}

export interface ConnectedWallet {
  name: string
  address: string
  balance: string
  chainId: string
}

// Blockchain Types
export interface BlockInfo {
  height: number
  hash: string
  previousHash: string
  timestamp: number
  numTransactions: number
  proposer: string
  proposerName?: string
  size: number
  gasUsed: number
  gasLimit: number
  rewards: string
}

export interface TransactionInfo {
  hash: string
  height: number
  timestamp: number
  fromAddress: string
  toAddress?: string
  amount?: string
  denom?: string
  fee: string
  gasUsed: number
  gasLimit: number
  status: 'success' | 'failed' | 'pending'
  memo?: string
  messageType: string
  rawLog?: string
}

export interface NetworkStatus {
  latestBlockHeight: number
  latestBlockTime: number
  chainId: string
  numValidators: number
  activeValidators: number
  numPeers: number
  catchingUp: boolean
  nodeVersion: string
  totalSupply: TokenSupply[]
  avgBlockTime: number
  transactionsToday: number
  totalAddresses: number
}

export interface TokenSupply {
  denom: string
  amount: string
}

// User Types
export interface User {
  address: string
  name: string
  email: string
  bio?: string
  avatarUrl?: string
  createdAt: number
  updatedAt: number
  active: boolean
}

export interface CreateUserRequest {
  name: string
  email: string
  bio?: string
  avatarUrl?: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  bio?: string
  avatarUrl?: string
}

// Token Types
export interface TokenBalance {
  denom: string
  amount: string
  displayAmount?: string
  usdValue?: number
}

export interface MintTokensRequest {
  amount: string
  denom: string
  recipient?: string
}

export interface BurnTokensRequest {
  amount: string
  denom: string
}

export interface TokenParams {
  mintDenom: string
  maxSupply: string
}

// Transfer Types
export interface TransferRequest {
  toAddress: string
  amount: string
  denom: string
  memo?: string
}

export interface BatchSendEntry {
  toAddress: string
  amount: string
}

export interface BatchSendRequest {
  sends: BatchSendEntry[]
  denom: string
  memo?: string
}

export interface TransferRecord {
  txHash: string
  fromAddress: string
  toAddress: string
  amount: string
  denom: string
  timestamp: number
  blockHeight: number
  memo?: string
  fee: string
}

export interface TransferStats {
  totalTransfers: number
  totalVolume: string
  transfersSent: number
  transfersReceived: number
  volumeSent: string
  volumeReceived: string
  uniqueCounterparts: number
}

// Mining Types
export interface Miner {
  address: string
  name: string
  hashRate: number
  totalRewards: string
  blocksMined: number
  active: boolean
  joinedAt: number
  lastActive: number
  miningPower: string
}

export interface RegisterMinerRequest {
  name: string
  hashRate: number
}

export interface UpdateHashRateRequest {
  newHashRate: number
}

export interface MiningReward {
  blockHeight: number
  rewardAmount: string
  timestamp: number
  difficulty: number
}

export interface MiningStats {
  totalMiners: number
  activeMiners: number
  totalHashRate: number
  totalRewardsDistributed: string
  currentDifficulty: number
  blocksMinedToday: number
  averageBlockTime: number
}

export interface MiningDifficulty {
  currentDifficulty: number
  targetBlockTime: number
  lastAdjustment: number
  nextAdjustmentHeight: number
}

// Validator Types
export interface ValidatorInfo {
  address: string
  consensusAddress: string
  moniker: string
  votingPower: string
  commission: string
  jailed: boolean
  status: 'bonded' | 'unbonded' | 'unbonding'
  uptime: number
  delegatorShares: string
}

// Address Info
export interface AddressInfo {
  address: string
  balances: TokenBalance[]
  transactionCount: number
  firstSeen: number
  lastActive: number
  isValidator: boolean
  isContract: boolean
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

// Form Types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'number' | 'password' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: { label: string; value: string }[]
  validation?: {
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
    pattern?: RegExp
  }
}

// Component Props Types
export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  text?: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface ToastMessage {
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

// Query & Mutation Types
export interface QueryOptions {
  enabled?: boolean
  refetchInterval?: number
  refetchOnWindowFocus?: boolean
  staleTime?: number
  retry?: number
}

export interface MutationOptions<TData, TError, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void
  onError?: (error: TError, variables: TVariables) => void
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables) => void
}

// Event Types
export interface BlockchainEvent {
  type: 'NewBlock' | 'NewTransaction' | 'ValidatorUpdate' | 'TokenMint' | 'MiningReward'
  data: any
  timestamp: number
}

// Configuration Types
export interface ChainConfig {
  chainId: string
  chainName: string
  rpc: string
  rest: string
  bech32Prefix: string
  coinDenom: string
  coinDecimals: number
  gasPrices: string
}

// Utility Types
export type Status = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  status: Status
  error: string | null
}

// Re-export commonly used types
export type { ReactNode } from 'react'
export type { RouteObject } from 'react-router-dom'
