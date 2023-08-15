export class NonEmptyWalletError extends Error {
  code = 403;
  override message = 'Your wallet has enough Görli ETH.';
}
