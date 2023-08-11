export interface IAppConfig {
  authUrl: string;
  authSecret: string;
  enableCaptcha: boolean;
  captchaSecretKey: string;
  nonceType: string;
  transactionHistoryType: string;
  redisUrl: string;
  redisOptions?: any;
  defaultMillisecondsLayover: number;
  defaultBlockLayover: number;
  pollingInterval: number;
  blockchainNetworks: {
    [key: string]: IBlockchainConfig;
  };
  privilegedWallets: string[];
  walletAddress: string | undefined;
}

export interface IBlockchainConfig {
  key: string;
  name: string;
  providerUrl: string;
  networkId?: string;
  walletPrivateKey: string;
  nativeAsset: string;
  defaultDailyAmount: number;
  privilegedDailyAmount: number;
  blockscanUrl: string;
}
