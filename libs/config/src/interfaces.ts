export type Network = 'sepolia' | 'goerli' | 'base' | 'arbitrum' | 'bnb' | 'mumbai' | 'optimism' | 'aptos';
type TrackingType = 'ip' | 'address';
export type TrackingConfig = Record<TrackingType, boolean>;
export interface IAppConfig {
  authUrl: string;
  authSecret: string;
  enableCaptcha: boolean;
  captchaSecretKey: string;
  nonceType: string;
  trackingType: TrackingConfig;
  redisUrl: string;
  redisOptions?: any;
  defaultMillisecondsLayover: number;
  defaultBlockLayover: number;
  pollingInterval: number;
  blockchainNetworks: Record<Network, IBlockchainConfig>;
  privilegedWallets: string[];
  walletAddress: string | undefined;
}

export interface IBlockchainConfig {
  name: Network;
  displayName: string;
  providerUrl: string;
  chainId: number;
  walletPrivateKey: string;
  nativeAsset: string;
  defaultDailyAmount: number;
  privilegedDailyAmount: number;
  blockscanUrl: string;
  walletAddress: string | undefined;
}
