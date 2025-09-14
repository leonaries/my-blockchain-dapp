import React, { useState, useEffect } from 'react';

interface Block {
  height: number;
  hash: string;
  timestamp: string;
  transactions: number;
  miner: string;
  size: number;
}

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: number;
  timestamp: string;
  status: 'confirmed' | 'pending';
  blockHeight?: number;
}

const ExplorerPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'blocks' | 'transactions'>('blocks');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 模拟获取区块链数据
  useEffect(() => {
    const fetchBlockchainData = async () => {
      // 这里应该是从区块链或API获取数据
      setTimeout(() => {
        // 模拟区块数据
        const mockBlocks: Block[] = Array.from({ length: 10 }, (_, i) => ({
          height: 10245 - i,
          hash: `0x${Math.random().toString(16).substring(2, 66)}`,
          timestamp: new Date(Date.now() - i * 60000).toLocaleString(),
          transactions: Math.floor(Math.random() * 30) + 1,
          miner: `0x${Math.random().toString(16).substring(2, 42)}`,
          size: Math.floor(Math.random() * 500) + 200
        }));
        
        // 模拟交易数据
        const mockTransactions: Transaction[] = Array.from({ length: 15 }, (_, i) => ({
          hash: `0x${Math.random().toString(16).substring(2, 66)}`,
          from: `0x${Math.random().toString(16).substring(2, 42)}`,
          to: `0x${Math.random().toString(16).substring(2, 42)}`,
          value: parseFloat((Math.random() * 10).toFixed(4)),
          timestamp: new Date(Date.now() - i * 30000).toLocaleString(),
          status: Math.random() > 0.1 ? 'confirmed' : 'pending',
          blockHeight: Math.random() > 0.1 ? 10245 - Math.floor(Math.random() * 5) : undefined
        }));
        
        setBlocks(mockBlocks);
        setTransactions(mockTransactions);
        setLoading(false);
      }, 1000);
    };
    
    fetchBlockchainData();
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // 模拟搜索功能
    setLoading(true);
    
    setTimeout(() => {
      // 这里应该根据搜索查询获取相关数据
      // 例如，如果搜索的是区块高度、区块哈希、交易哈希或地址
      
      if (searchQuery.startsWith('0x')) {
        // 假设是地址或哈希
        setActiveTab('transactions');
        // 过滤相关交易
        const filteredTransactions = transactions.filter(
          tx => tx.hash.includes(searchQuery) || 
                tx.from.includes(searchQuery) || 
                tx.to.includes(searchQuery)
        );
        
        if (filteredTransactions.length > 0) {
          setTransactions(filteredTransactions);
        } else {
          // 如果没找到，重置为原始数据
          alert('未找到相关交易');
        }
      } else if (!isNaN(parseInt(searchQuery))) {
        // 假设是区块高度
        setActiveTab('blocks');
        const blockHeight = parseInt(searchQuery);
        const filteredBlocks = blocks.filter(block => block.height === blockHeight);
        
        if (filteredBlocks.length > 0) {
          setBlocks(filteredBlocks);
        } else {
          alert('未找到该区块高度');
        }
      } else {
        alert('请输入有效的搜索内容（区块高度、哈希或地址）');
      }
      
      setLoading(false);
    }, 500);
  };

  const resetSearch = () => {
    // 重新获取所有数据
    setLoading(true);
    setSearchQuery('');
    
    setTimeout(() => {
      // 重新获取模拟数据
      const mockBlocks: Block[] = Array.from({ length: 10 }, (_, i) => ({
        height: 10245 - i,
        hash: `0x${Math.random().toString(16).substring(2, 66)}`,
        timestamp: new Date(Date.now() - i * 60000).toLocaleString(),
        transactions: Math.floor(Math.random() * 30) + 1,
        miner: `0x${Math.random().toString(16).substring(2, 42)}`,
        size: Math.floor(Math.random() * 500) + 200
      }));
      
      const mockTransactions: Transaction[] = Array.from({ length: 15 }, (_, i) => ({
        hash: `0x${Math.random().toString(16).substring(2, 66)}`,
        from: `0x${Math.random().toString(16).substring(2, 42)}`,
        to: `0x${Math.random().toString(16).substring(2, 42)}`,
        value: parseFloat((Math.random() * 10).toFixed(4)),
        timestamp: new Date(Date.now() - i * 30000).toLocaleString(),
        status: Math.random() > 0.1 ? 'confirmed' : 'pending',
        blockHeight: Math.random() > 0.1 ? 10245 - Math.floor(Math.random() * 5) : undefined
      }));
      
      setBlocks(mockBlocks);
      setTransactions(mockTransactions);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">区块链浏览器</h1>
      
      {/* 搜索栏 */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索区块高度、交易哈希或地址..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md transition duration-200"
            >
              搜索
            </button>
            <button
              onClick={resetSearch}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition duration-200"
            >
              重置
            </button>
          </div>
        </div>
      </div>
      
      {/* 标签切换 */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('blocks')}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'blocks' 
              ? 'border-b-2 border-primary-600 text-primary-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          区块
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'transactions' 
              ? 'border-b-2 border-primary-600 text-primary-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          交易
        </button>
      </div>
      
      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">加载中...</div>
        ) : activeTab === 'blocks' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">高度</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">哈希</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交易数</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">矿工</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">大小</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blocks.map((block) => (
                  <tr key={block.hash} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                      #{block.height}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {`${block.hash.substring(0, 8)}...${block.hash.substring(block.hash.length - 8)}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {block.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {block.transactions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {`${block.miner.substring(0, 6)}...${block.miner.substring(block.miner.length - 4)}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {block.size} KB
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交易哈希</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">区块</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发送方</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">接收方</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金额</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((tx) => (
                  <tr key={tx.hash} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 font-mono">
                      {`${tx.hash.substring(0, 8)}...${tx.hash.substring(tx.hash.length - 8)}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {tx.blockHeight ? `#${tx.blockHeight}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {`${tx.from.substring(0, 6)}...${tx.from.substring(tx.from.length - 4)}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {`${tx.to.substring(0, 6)}...${tx.to.substring(tx.to.length - 4)}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {tx.value} ETH
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tx.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        tx.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {tx.status === 'confirmed' ? '已确认' : '待确认'}
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

export default ExplorerPage; 