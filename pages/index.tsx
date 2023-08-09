import type { NextPage } from 'next';

import { FaucetTitle, RoundedBox } from '@/components';
import { ClaimFaucet, FaucetBalance } from '@/containers';

const Home: NextPage = () => {
  return (
    <div>
      <FaucetTitle title="Sepolia Faucet" subTitle="Fast and Reliable Source of Sepolia 0.1 ETH/day" />
      <RoundedBox>
        <FaucetBalance />
        <ClaimFaucet />
      </RoundedBox>
    </div>
  );
};

export default Home;
