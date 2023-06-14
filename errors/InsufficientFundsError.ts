export class InsufficientFundsError extends Error {
  code = 500
  message = "Our wallet run out of Sepolia ETH. Try again later."
}
