export class IpLimitExceeded extends Error {
  code = 403;
  message =
    'Your Wallet/Twitter account has received Sepolia ETH from us today already. You need to wait 24 hours from your last successful request to claim tokens again.';
}
