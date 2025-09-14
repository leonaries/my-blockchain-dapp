import React, { useState, useEffect } from 'react';
import { useWallet } from '@store/WalletContext';

interface MiningStats {
  hashRate: number;
  blocksFound: number;
  rewards: number;
  activeMiners: number;
  difficulty: number;
  lastBlock: string;
}

interface MiningHistory {
  id: string;
  blockHeight: number;
  timestamp: string;
  reward: number;
  hash: string;
}

const MiningPage: React.FC = () => {
  const { connectedWallet } = useWallet();
  const isConnected = !!connectedWallet;
  
  const [isMining, setIsMining] = useState<boolean>(false);
  const [miningPower, setMiningPower] = useState<number>(50);
  const [miningStats, setMiningStats] = useState<MiningStats>({
    hashRate: 0,
    blocksFound: 0,
    rewards: 0,
    activeMiners: 0,
    difficulty: 0,
    lastBlock: ''
  });
  const [miningHistory, setMiningHistory] = useState<MiningHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 模拟获取挖矿数据
  useEffect(() => {
    const fetchMiningData = async () => {
      // 这里应该是从区块链或API获取挖矿数据
      setTimeout(() => {
        setMiningStats({
          hashRate: 45.7,
          blocksFound: 28,
          rewards: 140,
          activeMiners: 153,
          difficulty: 3.45,
          lastBlock: '0x8a7b...2f9d'
        });
        
        setMiningHistory([
          {
            id: '1',
            blockHeight: 10245,
            timestamp: '2025-09-14 09:45:23',
            reward: 5,
            hash: '0x8a7b4c2d6e8f0a1b3c5d7e9f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0'
          },
          {
            id: '2',
            blockHeight: 10244,
            timestamp: '2025-09-14 09:32:17',
            reward: 5,
            hash: '0x1a3b5c7d9e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2c4e6f8a0b2c4'
          },
          {
            id: '3',
            blockHeight: 10243,
            timestamp: '2025-09-14 09:19:05',
            reward: 5,
            hash: '0x2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2c4e6f8a0b2c4d6e8f0a2c4e6f8a0b2c4'
          }
        ]);
        
        setLoading(false);
      }, 1000);
    };
    
    fetchMiningData();
    
    // 模拟实时更新
    const interval = setInterval(() => {
      if (isMining) {
        setMiningStats(prev => ({
          ...prev,
          hashRate: prev.hashRate + (Math.random() * 0.1 * miningPower/50),
          activeMiners: prev.activeMiners + (Math.random() > 0.8 ? 1 : 0),
          difficulty: prev.difficulty + (Math.random() * 0.01)
        }));
        
        // 随机生成新区块
        if (Math.random() > 0.9) {
          const newBlockHeight = miningHistory.length > 0 
            ? miningHistory[0].blockHeight + 1 
            : 10246;
            
          const newBlock = {
            id: (miningHistory.length + 1).toString(),
            blockHeight: newBlockHeight,
            timestamp: new Date().toLocaleString(),
            reward: 5,
            hash: `0x${Math.random().toString(16).substring(2, 66)}`
          };
          
          setMiningHistory(prev => [newBlock, ...prev]);
          setMiningStats(prev => ({
            ...prev,
            blocksFound: prev.blocksFound + 1,
            rewards: prev.rewards + 5,
            lastBlock: `0x${newBlock.hash.substring(2, 6)}...${newBlock.hash.substring(62)}`
          }));
        }
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isMining, miningPower, miningHistory]);

  const handleStartMining = () => {
    setIsMining(true);
  };

  const handleStopMining = () => {
    setIsMining(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">区块挖矿</h1>
      
      {!isConnected ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-700">请先连接钱包以使用挖矿功能。</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 挖矿控制面板 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">挖矿控制</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">挖矿算力</label>
              <input
                type="range"
                min="10"
                max="100"
                value={miningPower}
                onChange={(e) => setMiningPower(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>低</span>
                <span>中</span>
                <span>高</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">当前算力: {miningPower}%</p>
            </div>
            
            <div className="flex flex-col space-y-3">
              {!isMining ? (
                <button
                  onClick={handleStartMining}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition duration-200"
                >
                  开始挖矿
                </button>
              ) : (
                <button
                  onClick={handleStopMining}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-200"
                >
                  停止挖矿
                </button>
              )}
              
              <p className="text-sm text-gray-600 text-center">
                {isMining ? '挖矿进行中...' : '挖矿已停止'}
              </p>
            </div>
          </div>
          
          {/* 挖矿统计 */}
          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">挖矿统计</h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-gray-500">加载中...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">算力</p>
                  <p className="text-xl font-semibold">{miningStats.hashRate.toFixed(2)} MH/s</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">已挖区块</p>
                  <p className="text-xl font-semibold">{miningStats.blocksFound}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">总奖励</p>
                  <p className="text-xl font-semibold">{miningStats.rewards} ETH</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">活跃矿工</p>
                  <p className="text-xl font-semibold">{miningStats.activeMiners}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">难度</p>
                  <p className="text-xl font-semibold">{miningStats.difficulty.toFixed(2)}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">最新区块</p>
                  <p className="text-xl font-semibold font-mono">{miningStats.lastBlock}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* 挖矿历史 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">挖矿历史</h2>
        
        {loading ? (
          <div className="p-6 text-center text-gray-500">加载中...</div>
        ) : miningHistory.length === 0 ? (
          <div className="p-6 text-center text-gray-500">暂无挖矿记录</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">区块高度</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">奖励</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">区块哈希</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {miningHistory.map((block) => (
                  <tr key={block.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{block.blockHeight}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {block.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {block.reward} ETH
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {`${block.hash.substring(0, 8)}...${block.hash.substring(block.hash.length - 8)}`}
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

export default MiningPage; 