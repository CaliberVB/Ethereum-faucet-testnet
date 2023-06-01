import { recoverPersonalSignature } from "@metamask/eth-sig-util"
import { ethers } from "ethers"
import { defaultWalletWeiAmount } from "../consts/env"
import { InsufficientFundsError } from "../errors/InsufficientFundsError"
import { NonceExpiredError } from "../errors/NonceExpiredError"
import { NonEmptyWalletError } from "../errors/NonEmptyWalletError"
import { SignatureMismatchError } from "../errors/SignatureMismatchError"
import { WalletAlreadyFunded } from "../errors/WalletAlreadyFunded"
import { Blockchain } from "../interfaces/Blockchain"
import { Nonce } from "../interfaces/Nonce"
import { TransactionHistory } from "../interfaces/TransactionHistory"
import { extractNonceFromMessage } from "../utils/textMessage"
import { WalletClassification } from "./WalletClassification"

export class Ethereum implements Blockchain {
  constructor(
    private readonly wallet: ethers.Wallet,
    private readonly nonceService: Nonce,
    private readonly classificationService: WalletClassification,
    private readonly transactionHistoryService: TransactionHistory | undefined = undefined
  ) {}

  async fundWallet(address: string): Promise<string> {
    try {
      const amount = this.classificationService.retrieveAmount(address)
      const value = ethers.BigNumber.from(amount.toString())

      const transaction = {
        to: address,
        value
      }
      const tx = await this.wallet.sendTransaction(transaction)
      console.log(tx.hash)
      // Added after the video was released to prevent user from draining system's wallet
      if (this.transactionHistoryService === undefined) {
        return tx.hash
      }

      await this.transactionHistoryService.recordTransaction(address)
      return tx.hash
    } catch (e: any) {
      if (e?.code === "INSUFFICIENT_FUNDS") {
        throw new InsufficientFundsError()
      }

      throw e
    }
  }

  async verifyMessage(address: string, message: string, signature: string): Promise<boolean> {
    const nonce = extractNonceFromMessage(message)
    const isValid = await this.nonceService.verify(nonce)

    if (!isValid) {
      throw new NonceExpiredError()
    }

    const recoveredAddress = recoverPersonalSignature({
      data: message,
      signature
    })

    if (address.toLowerCase() !== recoveredAddress.toLowerCase()) {
      throw new SignatureMismatchError()
    }

    return true
  }

  async isEligible(address: string): Promise<void> {
    // Privileged wallets aren’t checked for eligibility
    if (this.classificationService.isPrivileged(address)) {
      return
    }

    const balance = await this.wallet.provider.getBalance(address)

    if (balance.gt(defaultWalletWeiAmount)) {
      throw new NonEmptyWalletError()
    }

    // Added after the video was released to prevent user from draining system's wallet
    if (this.transactionHistoryService === undefined) {
      return
    }

    const hasReceivedTokens = await this.transactionHistoryService.hasReceivedTokens(address)

    if (hasReceivedTokens) {
      throw new WalletAlreadyFunded()
    }
  }
}
