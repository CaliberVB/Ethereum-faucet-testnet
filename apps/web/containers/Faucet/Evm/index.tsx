import { EVMBalance } from './FaucetBalance';
import { ClaimFaucet } from './Claim';

export const EvmFaucet = () => {
  return (
    <>
      <EVMBalance />
      <ClaimFaucet />
    </>
  );
};
