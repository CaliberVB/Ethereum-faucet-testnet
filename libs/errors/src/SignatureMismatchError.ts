export class SignatureMismatchError extends Error {
  code = 401;
  override message = 'The message has not been signed by your wallet';
}
