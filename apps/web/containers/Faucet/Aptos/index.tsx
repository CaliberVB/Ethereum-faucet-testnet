import { AptosBalance } from './FaucetBalance';
import { ClaimFaucet } from './Claim';
import { AptosWalletProvider } from '@/contexts';

export const AptosFaucet = () => {
  return (
    <AptosWalletProvider>
      <AptosBalance />
      <ClaimFaucet />
    </AptosWalletProvider>
  );
};
