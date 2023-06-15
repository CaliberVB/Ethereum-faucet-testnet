import { ethers } from "ethers"
import Redis from "ioredis"
import { TransactionHistory } from "../interfaces/TransactionHistory"
import { EtherscanTransactionHistory } from "../services/EtherscanTransactionHistory"
import { IpTransactionHistory } from "../services/IpTransactionHistory"
import { RedisTransactionHistory } from "../services/RedisTransactionHistory"
import { TwitterTransactionHistory } from "../services/TwitterTransactionHistory"

export type TransactionHistoryType = "etherscan" | "redis" | "ip" | "twitter"

export const bootstrapTransactionHistory = (
  type: TransactionHistoryType,
  options?: any
): TransactionHistory | undefined => {
  switch (type) {
    case "etherscan": {
      const { chainId } = options as { chainId: number }
      const etherscan = new ethers.providers.EtherscanProvider(chainId, process.env.ETHERSCAN_API_KEY)
      const etherscanService = new EtherscanTransactionHistory(etherscan)
      console.log("etherscan")
      return etherscanService
    }
    case "redis": {
      const redis = new Redis(process.env.REDIS_URL as string, {
        tls: {
          rejectUnauthorized: false
        }
      })
      const redisService = new RedisTransactionHistory(redis)
      console.log("redis")
      // @ts-ignore
      return redisService
    }
    case "ip": {
      const redis = new Redis(process.env.REDIS_URL as string, {
        tls: {
          rejectUnauthorized: false
        }
      })
      const ipService = new IpTransactionHistory(redis)
      console.log("ip")
      // @ts-ignores
      return ipService
    }
    case "twitter": {
      const redis = new Redis(process.env.REDIS_URL as string, {
        tls: {
          rejectUnauthorized: false
        }
      })
      const twitterService = new TwitterTransactionHistory(redis)
      console.log("ip")
      // @ts-ignore
      return twitterService
    }
    default: {
      console.log("nothing")

      return undefined
    }
  }
}
