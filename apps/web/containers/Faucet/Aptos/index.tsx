import { AptosBalance } from './FaucetBalance';
import { ClaimFaucet } from './Claim';

export const AptosFaucet = () => {
  return (
    <>
      <AptosBalance />
      <ClaimFaucet />
    </>
  );
};
