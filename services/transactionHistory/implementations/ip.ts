import Redis from "ioredis"
import { ITransactionHistoryService } from "../interfaces"
// @ts-ignore
export class IpTransactionHistory implements ITransactionHistoryService {
  constructor(private readonly redis: Redis) {}

  async hasReceivedTokens(ipAddress: string, minLayover: number): Promise<boolean> {
    const timeString = await this.redis.get(ipAddress)

    if (timeString === null) {
      return false
    }

    const lastTransactionTime = new Date(timeString).getTime()
    const nowTime = new Date().getTime()

    return nowTime - lastTransactionTime < minLayover
  }

  async recordTransaction(ipAddress: string) {
    const nowTime = new Date().toISOString()

    await this.redis.set(ipAddress, nowTime)
  }
}
