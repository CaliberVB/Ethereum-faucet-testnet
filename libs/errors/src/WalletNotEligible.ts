export class WalletNotEligible extends Error {
  code = 403;
  override message = 'Your wallet either is too young or have too little transactions. Try another wallet';
}
