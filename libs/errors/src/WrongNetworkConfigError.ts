export class WrongNetworkConfigError extends Error {
  code = 500;
  override message = 'Wrong Network config';
}
