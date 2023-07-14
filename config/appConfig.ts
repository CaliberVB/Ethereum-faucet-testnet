import { IAppConfig } from "./interfaces";
import { privilegedWallets } from "./wallets";

const config: IAppConfig = {
  authUrl: process.env.NEXTAUTH_URL || "",
  authSecret: process.env.NEXTAUTH_SECRET || "",
  enableCaptcha: false,
  captchaSecretKey: process.env.RECAPTCHA_SECRET_KEY || "",
  nonceType: "timestamp",
  redisUrl: process.env.REDIS_URL as string || "",
  redisOptions: {
    tls: {
      rejectUnauthorized: false
    }
  },
  transactionHistoryType: "address",
  defaultMillisecondsLayover: 86400000,
  defaultBlockLayover: 5400,
  pollingInterval: 20_000,
  blockchainNetworks: {
    sepolia: {
      name: "Sepolia network",
      providerUrl: process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA || "",
      nativeAsset: "ETH",
      defaultDailyAmount: parseFloat(process.env.NEXT_PUBLIC_DEFAULT_WALLET_ETH_AMOUNT as string) || 0.1,
      privilegedDailyAmount: parseFloat(process.env.NEXT_PUBLIC_PRIVILEGED_WALLET_ETH_AMOUNT as string) || 0.2,
      blockscanUrl: `https://api-sepolia.etherscan.io/api?apiKey=${process.env.ETHERSCAN_API_KEY}`,
      walletPrivateKey: process.env.WALLET_PRIVATE_KEY || ""
    },
    goerli: {
      name: "Goerli network",
      providerUrl: process.env.NEXT_PUBLIC_ALCHEMY_GOERLI || "",
      nativeAsset: "ETH",
      defaultDailyAmount: parseFloat(process.env.NEXT_PUBLIC_DEFAULT_WALLET_ETH_AMOUNT as string) || 0.1,
      privilegedDailyAmount: parseFloat(process.env.NEXT_PUBLIC_PRIVILEGED_WALLET_ETH_AMOUNT as string) || 0.2,
      blockscanUrl: `https://api-sepolia.etherscan.io/api?apiKey=${process.env.ETHERSCAN_API_KEY}`,
      walletPrivateKey: process.env.WALLET_PRIVATE_KEY || ""
    }
  },
  privilegedWallets
}

export default config;