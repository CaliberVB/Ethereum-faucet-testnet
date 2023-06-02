import { ethers } from "ethers"
import { defaultBlockLayover } from "../consts/env"
import { TransactionHistory } from "../interfaces/TransactionHistory"

export class EtherscanTransactionHistory implements TransactionHistory {
  constructor(private readonly provider: ethers.providers.EtherscanProvider) {}

  async hasReceivedTokens(address: string, blockSpan: number = defaultBlockLayover): Promise<boolean> {
    const endBlock = await this.provider.getBlockNumber()
    const startBlock = endBlock - blockSpan

    const transactions = await this.provider.getHistory(address, startBlock, endBlock)

    for (const transaction of transactions) {
      if (transaction.from.toLocaleLowerCase() === process.env.WALLET_ADDRESS?.toLocaleLowerCase()) {
        return true
      }
    }

    return false
  }

  async checkWalletActivity(
    address: string,
    requiredTxCount: number = 1,
    requiredDaysOld: number = 1
  ): Promise<boolean> {
    const now = Math.floor(Date.now() / 1000) // current timestamp in seconds
    const monthInSeconds = requiredDaysOld * 24 * 60 * 60

    const transactions = await this.provider.getHistory(address)
    if (transactions.length === 0) {
      return false // return false if there are no transactions
    }

    // check if the wallet is at least one month old
    const firstTx = transactions[transactions.length - 1] // assuming the last element is the earliest
    if (!firstTx || now - firstTx.timestamp < monthInSeconds) {
      return false
    }

    // check if the wallet has at least 10 transactions
    if (transactions.length < requiredTxCount) {
      return false
    }

    return true
  }

  async recordTransaction(_: string) {
    // do nothing
  }
}
