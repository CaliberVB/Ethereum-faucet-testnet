export class InsufficientFundsError extends Error {
  code = 500;
  override message = 'Our wallet run out of {network} {symbol}. Try again later.';
}
