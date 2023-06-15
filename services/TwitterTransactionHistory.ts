import Redis from "ioredis"
import { defaultMillisecondsLayover } from "../consts/env"
import { TransactionHistory } from "../interfaces/TransactionHistory"

// @ts-ignore
export class TwitterTransactionHistory implements TransactionHistory {
  constructor(private readonly redis: Redis) {}

  async hasReceivedTokens(handle: string, minLayover: number = defaultMillisecondsLayover): Promise<boolean> {
    const timeString = await this.redis.get(handle)

    if (timeString === null) {
      return false
    }

    const lastTransactionTime = new Date(timeString).getTime()
    const nowTime = new Date().getTime()

    return nowTime - lastTransactionTime < minLayover
  }

  async recordTransaction(handle: string) {
    const nowTime = new Date().toISOString()

    await this.redis.set(handle, nowTime)
  }
}
