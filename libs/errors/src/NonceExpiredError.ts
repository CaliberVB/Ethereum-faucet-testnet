export class NonceExpiredError extends Error {
  code = 401;
  override message = 'Your nonce has expired. Try again.';
}
