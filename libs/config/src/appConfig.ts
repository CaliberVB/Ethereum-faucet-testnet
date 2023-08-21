import { Sepolia, Goerli, BaseGoerli, ArbitrumGoerli, BSCTestnet, Mumbai, OptimismGoerli } from '@usedapp/core';
import { IAppConfig } from './interfaces';
import { privilegedWallets } from './wallets';

const config: IAppConfig = {
  walletAddress: process.env['NEXT_PUBLIC_WALLET_ADDRESS'],
  authUrl: process.env['NEXTAUTH_URL'] ?? '',
  authSecret: process.env['NEXTAUTH_SECRET'] ?? '',
  enableCaptcha: false,
  captchaSecretKey: process.env['RECAPTCHA_SECRET_KEY'] ?? '',
  nonceType: 'timestamp',
  redisUrl: (process.env['REDIS_URL'] as string) || '',
  redisOptions: {
    tls: {
      rejectUnauthorized: false,
    },
  },
  trackingType: {
    address: true,
    ip: true,
  },
  defaultMillisecondsLayover: 86400000,
  defaultBlockLayover: 5400,
  pollingInterval: 20_000,
  blockchainNetworks: {
    sepolia: {
      name: 'sepolia',
      displayName: 'Sepolia',
      providerUrl: 'https://sepolia.infura.io/v3/67b037b543f242af9b784f1f56abe720',
      nativeAsset: 'ETH',
      defaultDailyAmount: 0.1,
      privilegedDailyAmount: 0.2,
      blockscanUrl: `${Sepolia.blockExplorerUrl}/tx/{txhash}`,
      walletPrivateKey: process.env['WALLET_PRIVATE_KEY'] ?? '',
      chainId: Sepolia.chainId,
    },
    goerli: {
      name: 'goerli',
      displayName: 'Goerli',
      providerUrl: 'https://eth-goerli.g.alchemy.com/v2/QqThDnaM2AbY1_fKosRsajBg2J309S9j',
      nativeAsset: 'ETH',
      defaultDailyAmount: 0.1,
      privilegedDailyAmount: 0.2,
      blockscanUrl: `${Goerli.blockExplorerUrl}/tx/{txhash}`,
      walletPrivateKey: process.env['WALLET_PRIVATE_KEY'] ?? '',
      chainId: Goerli.chainId,
    },
    mumbai: {
      name: 'mumbai',
      displayName: 'Mumbai',
      providerUrl: 'https://endpoints.omniatech.io/v1/matic/mumbai/public',
      nativeAsset: 'MATIC',
      defaultDailyAmount: 0.1,
      privilegedDailyAmount: 0.2,
      blockscanUrl: `${Mumbai.blockExplorerUrl}/tx/{txhash}`,
      walletPrivateKey: process.env['WALLET_PRIVATE_KEY'] ?? '',
      chainId: Mumbai.chainId,
    },
    base: {
      name: 'base',
      displayName: 'Base',
      providerUrl: 'https://base-goerli.blockpi.network/v1/rpc/public',
      nativeAsset: 'ETH',
      defaultDailyAmount: 0.1,
      privilegedDailyAmount: 0.2,
      blockscanUrl: `${BaseGoerli.blockExplorerUrl}/tx/{txhash}`,
      walletPrivateKey: process.env['WALLET_PRIVATE_KEY'] || '',
      chainId: BaseGoerli.chainId,
    },
    arbitrum: {
      name: 'arbitrum',
      displayName: 'Arbitrum Goerli',
      providerUrl: 'https://arbitrum-goerli.public.blastapi.io',
      nativeAsset: 'ETH',
      defaultDailyAmount: 0.1,
      privilegedDailyAmount: 0.2,
      blockscanUrl: `${ArbitrumGoerli.blockExplorerUrl}/tx/{txhash}`,
      walletPrivateKey: process.env['WALLET_PRIVATE_KEY'] || '',
      chainId: ArbitrumGoerli.chainId,
    },
    optimism: {
      name: 'optimism',
      displayName: 'Optimism Goerli',
      providerUrl: 'https://optimism-goerli.publicnode.com',
      nativeAsset: 'ETH',
      defaultDailyAmount: 0.1,
      privilegedDailyAmount: 0.2,
      blockscanUrl: `${OptimismGoerli.blockExplorerUrl}/tx/{txhash}`,
      walletPrivateKey: process.env['WALLET_PRIVATE_KEY'] || '',
      chainId: OptimismGoerli.chainId,
    },
    bnb: {
      name: 'bnb',
      displayName: 'BNB Smart Chain',
      providerUrl: 'https://endpoints.omniatech.io/v1/bsc/testnet/public',
      nativeAsset: 'BNB',
      defaultDailyAmount: 0.01,
      privilegedDailyAmount: 0.2,
      blockscanUrl: `${BSCTestnet.blockExplorerUrl}/tx/{txhash}`,
      walletPrivateKey: process.env['WALLET_PRIVATE_KEY'] ?? '',
      chainId: BSCTestnet.chainId,
    },
    aptos: {
      name: 'aptos',
      displayName: 'Aptos',
      providerUrl: 'https://fullnode.testnet.aptoslabs.com/v1',
      nativeAsset: 'APT',
      defaultDailyAmount: 1,
      privilegedDailyAmount: 1,
      blockscanUrl: 'https://explorer.aptoslabs.com/txn/{txhash}?network=testnet',
      walletPrivateKey: process.env['WALLET_PRIVATE_KEY'] ?? '',
      chainId: 0,
    },
  },
  privilegedWallets,
};

export default config;
