import { Sepolia, Goerli, BaseGoerli, ArbitrumGoerli } from '@usedapp/core';
import { IAppConfig } from './interfaces';
import { privilegedWallets } from './wallets';

const config: IAppConfig = {
  walletAddress: process.env.NEXT_PUBLIC_WALLET_ADDRESS,
  authUrl: process.env.NEXTAUTH_URL || '',
  authSecret: process.env.NEXTAUTH_SECRET || '',
  enableCaptcha: false,
  captchaSecretKey: process.env.RECAPTCHA_SECRET_KEY || '',
  nonceType: 'timestamp',
  redisUrl: (process.env.REDIS_URL as string) || '',
  redisOptions: {
    tls: {
      rejectUnauthorized: false,
    },
  },
  transactionHistoryType: 'address',
  defaultMillisecondsLayover: 86400000,
  defaultBlockLayover: 5400,
  pollingInterval: 20_000,
  blockchainNetworks: {
    sepolia: {
      name: 'sepolia',
      displayName: 'Sepolia',
      providerUrl: process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_RPC || '',
      nativeAsset: 'ETH',
      defaultDailyAmount: parseFloat(process.env.NEXT_PUBLIC_DEFAULT_WALLET_ETH_AMOUNT as string) || 0.1,
      privilegedDailyAmount: parseFloat(process.env.NEXT_PUBLIC_PRIVILEGED_WALLET_ETH_AMOUNT as string) || 0.2,
      blockscanUrl: `${Sepolia.blockExplorerUrl}?apiKey=${process.env.ETHERSCAN_API_KEY}`,
      walletPrivateKey: process.env.WALLET_PRIVATE_KEY || '',
      chainId: Sepolia.chainId,
    },
    goerli: {
      name: 'goerli',
      displayName: 'Goerli',
      providerUrl: process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_RPC || '',
      nativeAsset: 'ETH',
      defaultDailyAmount: parseFloat(process.env.NEXT_PUBLIC_DEFAULT_WALLET_ETH_AMOUNT as string) || 0.1,
      privilegedDailyAmount: parseFloat(process.env.NEXT_PUBLIC_PRIVILEGED_WALLET_ETH_AMOUNT as string) || 0.2,
      blockscanUrl: `${Goerli.blockExplorerUrl}?apiKey=${process.env.ETHERSCAN_API_KEY}`,
      walletPrivateKey: process.env.WALLET_PRIVATE_KEY || '',
      chainId: Goerli.chainId,
    },
    // mumbai: {
    //   name: 'mumbai',
    //   displayName: 'Mumbai',
    //   providerUrl: process.env.NEXT_PUBLIC_MUMBAI_RPC || '',
    //   nativeAsset: 'MATIC',
    //   defaultDailyAmount: parseFloat(process.env.NEXT_PUBLIC_DEFAULT_WALLET_ETH_AMOUNT as string) || 0.1,
    //   privilegedDailyAmount: parseFloat(process.env.NEXT_PUBLIC_PRIVILEGED_WALLET_ETH_AMOUNT as string) || 0.2,
    //   blockscanUrl: `${Mumbai.blockExplorerUrl}?apiKey=${process.env.ETHERSCAN_API_KEY}`,
    //   walletPrivateKey: process.env.WALLET_PRIVATE_KEY || '',
    //   chainId: Mumbai.chainId,
    // },
    base: {
      name: 'base',
      displayName: 'Base',
      providerUrl: process.env.NEXT_PUBLIC_BASE_RPC || '',
      nativeAsset: 'ETH',
      defaultDailyAmount: parseFloat(process.env.NEXT_PUBLIC_DEFAULT_WALLET_ETH_AMOUNT as string) || 0.1,
      privilegedDailyAmount: parseFloat(process.env.NEXT_PUBLIC_PRIVILEGED_WALLET_ETH_AMOUNT as string) || 0.2,
      blockscanUrl: `${BaseGoerli.blockExplorerUrl}?apiKey=${process.env.ETHERSCAN_API_KEY}`,
      walletPrivateKey: process.env.WALLET_PRIVATE_KEY || '',
      chainId: BaseGoerli.chainId,
    },
    arbitrum: {
      name: 'arbitrum',
      displayName: 'Arbitrum Goerli',
      providerUrl: process.env.NEXT_PUBLIC_ARBITRUM_GOERLI_RPC || '',
      nativeAsset: 'ETH',
      defaultDailyAmount: parseFloat(process.env.NEXT_PUBLIC_DEFAULT_WALLET_ETH_AMOUNT as string) || 0.1,
      privilegedDailyAmount: parseFloat(process.env.NEXT_PUBLIC_PRIVILEGED_WALLET_ETH_AMOUNT as string) || 0.2,
      blockscanUrl: `${ArbitrumGoerli.blockExplorerUrl}?apiKey=${process.env.ETHERSCAN_API_KEY}`,
      walletPrivateKey: process.env.WALLET_PRIVATE_KEY || '',
      chainId: ArbitrumGoerli.chainId,
    },
  },
  privilegedWallets,
};

export default config;
