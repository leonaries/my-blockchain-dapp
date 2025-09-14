import React, { useState } from 'react';
import { useWallet } from '@store/WalletContext';

interface TransferHistory {
  id: string;
  from: string;
  to: string;
  amount: number;
  token: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
}

const TransferPage: React.FC = () => {
  const { connectedWallet } = useWallet();
  const isConnected = !!connectedWallet;
  
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [selectedToken, setSelectedToken] = useState<string>('ETH');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transferHistory, setTransferHistory] = useState<TransferHistory[]>([
    {
      id: '1',
      from: '0x1234567890abcdef1234567890abcdef12345678',
      to: '0xabcdef1234567890abcdef1234567890abcdef12',
      amount: 1.5,
      token: 'ETH',
      timestamp: '2025-09-14 10:23:15',
      status: 'completed'
    },
    {
      id: '2',
      from: '0x1234567890abcdef1234567890abcdef12345678',
      to: '0x7890abcdef1234567890abcdef1234567890abcd',
      amount: 50,
      token: 'USDT',
      timestamp: '2025-09-13 15:45:30',
      status: 'completed'
    },
    {
      id: '3',
      from: '0xabcdef1234567890abcdef1234567890abcdef12',
      to: '0x1234567890abcdef1234567890abcdef12345678',
      amount: 0.25,
      token: 'BTC',
      timestamp: '2025-09-12 09:12:45',
      status: 'failed'
    }
  ]);

  const availableTokens = [
    { symbol: 'ETH', name: '以太坊', balance: 2.5 },
    { symbol: 'BTC', name: '比特币', balance: 0.05 },
    { symbol: 'USDT', name: 'Tether', balance: 500 },
    { symbol: 'DOGE', name: '狗狗币', balance: 1000 }
  ];

  const handleTransfer = async () => {
    if (!recipient || !amount || parseFloat(amount) <= 0) return;
    
    setIsLoading(true);
    
    try {
      // 模拟转账操作
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 生成随机状态，实际应用中应该是根据区块链交易结果
      const status = Math.random() > 0.1 ? 'completed' : 'failed';
      
      // 添加到转账历史
      const newTransfer: TransferHistory = {
        id: (transferHistory.length + 1).toString(),
        from: connectedWallet?.address || '',
        to: recipient,
        amount: parseFloat(amount),
        token: selectedToken,
        timestamp: new Date().toLocaleString(),
        status
      };
      
      setTransferHistory([newTransfer, ...transferHistory]);
      
      if (status === 'completed') {
        alert('转账成功！');
        // 清空表单
        setRecipient('');
        setAmount('');
      } else {
        alert('转账失败，请重试。');
      }
    } catch (error) {
      console.error('转账错误:', error);
      alert('转账过程中发生错误，请重试。');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">资产转账</h1>
      
      {!isConnected ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-700">请先连接钱包以使用转账功能。</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">发起转账</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">接收地址</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="输入接收方钱包地址"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">代币</label>
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {availableTokens.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol} ({token.balance})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">数量</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.000001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleTransfer}
              disabled={isLoading || !recipient || !amount}
              className={`w-full md:w-auto px-6 py-2 rounded-md transition duration-200 ${
                isLoading || !recipient || !amount
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              {isLoading ? '处理中...' : '转账'}
            </button>
          </div>
        </div>
      )}
      
      {/* 转账历史 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">转账历史</h2>
        
        {transferHistory.length === 0 ? (
          <div className="p-6 text-center text-gray-500">暂无转账记录</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发送方</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">接收方</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">数量</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transferHistory.map((transfer) => (
                  <tr key={transfer.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transfer.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="font-mono">{`${transfer.from.substring(0, 6)}...${transfer.from.substring(transfer.from.length - 4)}`}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="font-mono">{`${transfer.to.substring(0, 6)}...${transfer.to.substring(transfer.to.length - 4)}`}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transfer.amount} {transfer.token}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(transfer.status)}`}>
                        {transfer.status === 'completed' ? '成功' : transfer.status === 'pending' ? '处理中' : '失败'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferPage; 