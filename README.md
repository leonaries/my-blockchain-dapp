# My Blockchain DApp

> 基于 React + TypeScript 的区块链 DApp 前端项目，与 Cosmos SDK 区块链无缝集成

## 🌟 功能特性

### 用户管理 👥
- **创建新钱包** - 生成新的区块链地址
- **导入助记词** - 通过助记词恢复钱包
- **显示地址 & 余额** - 实时查看账户信息和代币余额

### 代币操作 🪙
- **发币 (mint)** - 铸造新的代币到指定地址
- **转账** - P2P 代币转账功能
- **余额查询** - 实时查看代币余额

### 代币转账 💸
- **P2P 转账** - 点对点代币转移
- **批量转账** - 一次性向多个地址转账
- **转账历史** - 查看完整的转账记录
- **转账统计** - 分析转账数据和趋势

### 挖矿系统 ⛏️
- **矿工注册** - 注册成为网络矿工
- **挖矿奖励** - 获取挖矿收益
- **算力统计** - 查看个人和网络算力
- **挖矿排行榜** - 矿工贡献排名

### 区块浏览器 🔍
- **查询区块高度** - 实时获取最新区块高度
- **查看最新区块交易** - 浏览区块详情和交易信息
- **交易查询** - 通过哈希查询具体交易
- **网络状态** - 监控区块链网络健康状态

## 🚀 快速开始

### 环境要求
- **Node.js** 18+ 
- **npm** 8+ 或 **yarn** 1.22+
- **区块链后端** - [my-blockchain](https://github.com/leonaries/my-blockchain) 运行在本地

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/leonaries/my-blockchain-dapp.git
cd my-blockchain-dapp

# 安装依赖
npm install
# 或
yarn install
```

### 启动开发服务器

```bash
# 启动开发环境
npm run dev
# 或
yarn dev
```

应用将在 http://localhost:3000 启动

### 生产构建

```bash
# 构建生产版本
npm run build
# 或
yarn build

# 预览生产版本
npm run preview
# 或
yarn preview
```

## 🔧 技术栈

### 前端框架
- **React 18** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 快速的构建工具

### 区块链集成
- **CosmJS** - Cosmos SDK 的 JavaScript 客户端
- **Keplr 钱包** - 主要钱包支持
- **Cosmostation** - 备选钱包支持

### UI/UX
- **TailwindCSS** - 实用优先的 CSS 框架
- **Lucide React** - 美观的图标库
- **React Hot Toast** - 优雅的通知组件

### 状态管理
- **React Query** - 服务器状态管理
- **Zustand** - 轻量级状态管理
- **React Context** - 钱包连接状态

### 路由和工具
- **React Router** - 客户端路由
- **React Hook Form** - 表单处理
- **Date-fns** - 日期处理工具

## 📁 项目结构

```
src/
├── 📁 components/          # 可复用组件
│   ├── Layout/            # 布局组件 (Header, Sidebar)
│   ├── WalletConnector/   # 钱包连接组件
│   └── ...                # 其他通用组件
├── 📁 pages/              # 页面组件
│   ├── HomePage.tsx       # 首页
│   ├── UserManagementPage.tsx  # 用户管理
│   ├── TokenPage.tsx      # 代币操作
│   ├── TransferPage.tsx   # 转账功能
│   ├── MiningPage.tsx     # 挖矿系统
│   └── ExplorerPage.tsx   # 区块浏览器
├── 📁 services/           # API 服务
│   ├── walletService.ts   # 钱包连接服务
│   ├── blockchainService.ts # 区块链交互
│   └── ...                # 其他服务
├── 📁 store/              # 状态管理
│   └── WalletContext.tsx  # 钱包状态上下文
├── 📁 types/              # TypeScript 类型定义
│   └── index.ts           # 全局类型
├── 📁 utils/              # 工具函数
├── 📁 hooks/              # 自定义 Hooks
└── 📁 assets/             # 静态资源
```

## 🔌 区块链连接

### 连接配置

DApp 默认连接到本地运行的区块链节点：

```typescript
const CHAIN_CONFIG = {
  chainId: 'mychain-1',
  chainName: 'My Blockchain',
  rpc: 'http://localhost:26657',      // Tendermint RPC
  rest: 'http://localhost:1317',      // Cosmos REST API
  bech32Prefix: 'myblockchain',
  coinDenom: 'token',
  coinDecimals: 6,
}
```

### 支持的钱包

1. **Keplr Wallet** (推荐)
   - 浏览器扩展钱包
   - 完整的 Cosmos 生态支持
   - 安装: [keplr.app](https://www.keplr.app/)

2. **Cosmostation Wallet**
   - 多平台钱包支持
   - 安装: [wallet.cosmostation.io](https://wallet.cosmostation.io/)

3. **Test Wallet** (开发专用)
   - 内置测试钱包
   - 用于开发和测试环境

## 🎯 使用指南

### 1. 连接钱包
- 点击 "连接钱包" 按钮
- 选择你偏好的钱包类型
- 授权 DApp 访问你的钱包

### 2. 用户管理
- 创建用户档案，设置个人信息
- 查看和更新用户资料
- 管理多个用户账户

### 3. 代币操作
- 铸造新代币 (需要权限)
- 查看代币总供应量
- 监控代币流通情况

### 4. 转账功能
- 发送代币到其他地址
- 批量转账给多个接收者
- 查看转账历史和统计

### 5. 挖矿系统
- 注册成为网络矿工
- 参与区块生产获得奖励
- 查看挖矿数据和排名

### 6. 区块浏览器
- 浏览最新区块和交易
- 搜索特定交易或地址
- 监控网络状态和性能

## 🔧 开发指南

### 环境变量

创建 `.env.local` 文件：

```bash
# 区块链节点配置
VITE_CHAIN_ID=mychain-1
VITE_RPC_URL=http://localhost:26657
VITE_REST_URL=http://localhost:1317

# 应用配置
VITE_APP_NAME=My Blockchain DApp
VITE_APP_VERSION=1.0.0
```

### 代码规范

```bash
# 代码检查
npm run lint

# 代码格式化
npm run format

# 类型检查
npm run type-check
```

### 组件开发

所有组件都使用 TypeScript 编写，并遵循以下约定：

- 使用函数组件和 Hooks
- 支持响应式设计
- 包含适当的错误处理
- 提供加载状态反馈

## 📱 响应式设计

DApp 完全支持响应式设计：

- **桌面端** - 完整功能体验
- **平板** - 优化的触摸界面
- **手机** - 移动优先的简洁界面

## 🧪 测试

```bash
# 运行单元测试
npm run test

# 运行集成测试  
npm run test:integration

# 测试覆盖率
npm run test:coverage
```

## 🚀 部署

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署到 Vercel
vercel --prod
```

### Netlify 部署

```bash
# 构建项目
npm run build

# 上传 dist/ 目录到 Netlify
```

### Docker 部署

```bash
# 构建镜像
docker build -t my-blockchain-dapp .

# 运行容器
docker run -p 3000:3000 my-blockchain-dapp
```

## 🤝 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

### 开发流程
- 遵循 React/TypeScript 最佳实践
- 保持组件的单一职责原则
- 添加适当的 TypeScript 类型
- 编写清晰的组件文档

## 🔗 相关链接

- **区块链后端**: [my-blockchain](https://github.com/leonaries/my-blockchain)
- **Cosmos SDK**: [cosmos.network](https://cosmos.network/)
- **CosmJS 文档**: [cosmjs.org](https://cosmjs.org/)
- **Keplr 钱包**: [keplr.app](https://www.keplr.app/)

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🆘 获取帮助

如果遇到问题或有疑问：

1. 查看 [Issues](https://github.com/leonaries/my-blockchain-dapp/issues)
2. 创建新的 Issue 描述问题
3. 查看区块链后端文档
4. 参考 CosmJS 官方文档

---

**Built with ❤️ using React + TypeScript + CosmJS**

⭐ 如果这个项目对你有帮助，请给我们一个 Star！
