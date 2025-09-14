import React, { useState, useEffect } from 'react';
import { useWallet } from '@store/WalletContext';
import { Coins, TrendingUp, AlertCircle } from 'lucide-react';

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

  // 计算市场总价值
  const totalMarketValue = tokens.reduce((sum, token) => sum + token.price * token.totalSupply, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 flex items-center">
            <Coins className="w-8 h-8 mr-3 text-primary-600" />
            代币管理
          </h1>
          <p className="text-secondary-600 mt-2">管理和创建您的区块链代币</p>
        </div>
        
        {/* 市场概览 */}
        <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-md border border-gray-100 p-4 flex items-center space-x-8">
          <div>
            <div className="text-sm text-secondary-500">总市值</div>
            <div className="text-xl font-bold text-secondary-900">${totalMarketValue.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-secondary-500">代币数量</div>
            <div className="text-xl font-bold text-secondary-900">{tokens.length}</div>
          </div>
        </div>
      </div>
      
      {/* 主要内容区 - 水平分栏布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：创建代币表单 */}
        <div className="lg:col-span-1">
          {isConnected ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Coins className="w-5 h-5 mr-2" />
                  创建新代币
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">代币名称</label>
                  <input
                    type="text"
                    value={newTokenName}
                    onChange={(e) => setNewTokenName(e.target.value)}
                    placeholder="例如：我的代币"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">代币符号</label>
                  <input
                    type="text"
                    value={newTokenSymbol}
                    onChange={(e) => setNewTokenSymbol(e.target.value)}
                    placeholder="例如：MTK"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">总供应量</label>
                  <input
                    type="number"
                    value={newTokenSupply}
                    onChange={(e) => setNewTokenSupply(e.target.value)}
                    placeholder="例如：1000000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white/50"
                  />
                </div>
                <button
                  onClick={handleCreateToken}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-3 rounded-md transition duration-200 shadow-md mt-4"
                >
                  创建代币
                </button>
              </div>
              <div className="bg-primary-50 p-4 border-t border-primary-100">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-primary-700">
                    创建代币后，您将成为该代币的所有者，并可以管理其供应量。
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
              <AlertCircle className="w-10 h-10 text-warning-500 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-secondary-900 mb-2">需要连接钱包</h3>
              <p className="text-secondary-600 mb-4">
                请先连接您的钱包以创建和管理代币
              </p>
            </div>
          )}
        </div>
        
        {/* 右侧：代币列表 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-secondary-900 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                代币列表
              </h2>
              <div className="text-sm text-secondary-500">{tokens.length} 个代币</div>
            </div>
            
            {loading ? (
              <div className="p-12 text-center">
                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-secondary-500">正在加载代币数据...</p>
              </div>
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
                      <tr key={token.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{token.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium bg-gray-100 text-gray-900 px-2 py-1 rounded-md inline-block">{token.symbol}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{token.totalSupply.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">${token.price.toFixed(2)}</div>
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
      </div>
    </div>
  );
};

export default TokenPage; 