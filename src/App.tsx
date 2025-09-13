import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Layout Components
import Layout from '@components/Layout/Layout'

// Page Components
import HomePage from '@pages/HomePage'
import UserManagementPage from '@pages/UserManagementPage'
import TokenPage from '@pages/TokenPage'
import TransferPage from '@pages/TransferPage'
import MiningPage from '@pages/MiningPage'
import ExplorerPage from '@pages/ExplorerPage'

// Wallet Provider
import { WalletProvider } from '@store/WalletContext'

function App() {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Home Page */}
            <Route index element={<HomePage />} />
            
            {/* Feature Pages */}
            <Route path="users" element={<UserManagementPage />} />
            <Route path="tokens" element={<TokenPage />} />
            <Route path="transfer" element={<TransferPage />} />
            <Route path="mining" element={<MiningPage />} />
            <Route path="explorer" element={<ExplorerPage />} />
            
            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
    </WalletProvider>
  )
}

export default App
