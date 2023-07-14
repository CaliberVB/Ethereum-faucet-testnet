import Redis from "ioredis"
import { ITransactionHistoryService } from "../interfaces"
// @ts-ignore
export class AddressTransactionHistory implements ITransactionHistoryService {
  constructor(private readonly redis: Redis) {}

  async hasReceivedTokens(address: string, minLayover: number): Promise<boolean> {
    const timeString = await this.redis.get(address)

    if (timeString === null) {
      return false
    }

    const lastTransactionTime = new Date(timeString).getTime()
    const nowTime = new Date().getTime()

    return nowTime - lastTransactionTime < minLayover
  }

  async recordTransaction(address: string) {
    const nowTime = new Date().toISOString()

    await this.redis.set(address, nowTime)
  }
}
