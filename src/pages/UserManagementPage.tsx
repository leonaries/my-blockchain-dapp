import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  address: string;
  balance: number;
  createdAt: string;
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newUsername, setNewUsername] = useState<string>('');

  // 模拟获取用户数据
  useEffect(() => {
    // 这里应该是从区块链或API获取用户数据
    const mockUsers: User[] = [
      {
        id: '1',
        username: '张三',
        address: '0x1234567890abcdef1234567890abcdef12345678',
        balance: 100.5,
        createdAt: '2025-09-10'
      },
      {
        id: '2',
        username: '李四',
        address: '0xabcdef1234567890abcdef1234567890abcdef12',
        balance: 250.75,
        createdAt: '2025-09-11'
      },
      {
        id: '3',
        username: '王五',
        address: '0x7890abcdef1234567890abcdef1234567890abcd',
        balance: 50.25,
        createdAt: '2025-09-12'
      }
    ];

    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateUser = () => {
    if (!newUsername.trim()) return;

    // 模拟创建新用户
    const newUser: User = {
      id: (users.length + 1).toString(),
      username: newUsername,
      address: `0x${Math.random().toString(16).substring(2, 42)}`,
      balance: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, newUser]);
    setNewUsername('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">用户管理</h1>
      
      {/* 创建用户表单 */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">创建新用户</h2>
        <div className="flex">
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="输入用户名"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={handleCreateUser}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md transition duration-200"
          >
            创建
          </button>
        </div>
      </div>
      
      {/* 用户列表 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">用户列表</h2>
        
        {loading ? (
          <div className="p-6 text-center text-gray-500">加载中...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">钱包地址</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">余额</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建时间</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="font-mono">{`${user.address.substring(0, 6)}...${user.address.substring(user.address.length - 4)}`}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.balance}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagementPage; 