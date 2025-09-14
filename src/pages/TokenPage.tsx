import React, { useState, useEffect } from 'react';
import { useWallet } from '@store/WalletContext';

interface Token {
  id: string;
  name: string;
  symbol: string;
  totalSupply: number;
  price: number;
  change24h: number;
}

const TokenPage: React.FC = () => {
  const { connectedWallet } = useWallet();
  const isConnected = !!connectedWallet;
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newTokenName, setNewTokenName] = useState<string>('');
  const [newTokenSymbol, setNewTokenSymbol] = useState<string>('');
  const [newTokenSupply, setNewTokenSupply] = useState<string>('');

  // 模拟获取代币数据
  useEffect(() => {
    // 这里应该是从区块链或API获取代币数据
    const mockTokens: Token[] = [
      {
        id: '1',
        name: '以太坊',
        symbol: 'ETH',
        totalSupply: 120000000,
        price: 2345.67,
        change24h: 2.5
      },
      {
        id: '2',
        name: '比特币',
        symbol: 'BTC',
        totalSupply: 21000000,
        price: 38456.78,
        change24h: -1.2
      },
      {
        id: '3',
        name: '莱特币',
        symbol: 'LTC',
        totalSupply: 84000000,
        price: 123.45,
        change24h: 0.8
      },
      {
        id: '4',
        name: '狗狗币',
        symbol: 'DOGE',
        totalSupply: 132000000000,
        price: 0.12,
        change24h: 5.7
      }
    ];

    setTimeout(() => {
      setTokens(mockTokens);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateToken = () => {
    if (!newTokenName.trim() || !newTokenSymbol.trim() || !newTokenSupply) return;

    // 模拟创建新代币
    const newToken: Token = {
      id: (tokens.length + 1).toString(),
      name: newTokenName,
      symbol: newTokenSymbol.toUpperCase(),
      totalSupply: parseFloat(newTokenSupply),
      price: 0.01,
      change24h: 0
    };

    setTokens([...tokens, newToken]);
    setNewTokenName('');
    setNewTokenSymbol('');
    setNewTokenSupply('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">代币管理</h1>
      
      {/* 创建代币表单 */}
      {isConnected && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">创建新代币</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">代币名称</label>
              <input
                type="text"
                value={newTokenName}
                onChange={(e) => setNewTokenName(e.target.value)}
                placeholder="例如：我的代币"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">代币符号</label>
              <input
                type="text"
                value={newTokenSymbol}
                onChange={(e) => setNewTokenSymbol(e.target.value)}
                placeholder="例如：MTK"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">总供应量</label>
              <input
                type="number"
                value={newTokenSupply}
                onChange={(e) => setNewTokenSupply(e.target.value)}
                placeholder="例如：1000000"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <button
            onClick={handleCreateToken}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition duration-200"
          >
            创建代币
          </button>
        </div>
      )}
      
      {/* 代币列表 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">代币列表</h2>
        
        {loading ? (
          <div className="p-6 text-center text-gray-500">加载中...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名称</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">符号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">总供应量</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">价格 (USD)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h变化</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tokens.map((token) => (
                  <tr key={token.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{token.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{token.symbol}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{token.totalSupply.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${token.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        token.change24h > 0 
                          ? 'bg-green-100 text-green-800' 
                          : token.change24h < 0 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {token.change24h > 0 ? '+' : ''}{token.change24h}%
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

export default TokenPage; 