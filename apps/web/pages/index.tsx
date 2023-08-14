import type { NextPage } from 'next';

import { RoundedBox } from '@/components';
import { ClaimFaucet, FaucetBalance, FaucetTitle } from '@/containers';

const Home: NextPage = () => {
  return (
    <div>
      <FaucetTitle />
      <RoundedBox>
        <FaucetBalance />
        <ClaimFaucet />
      </RoundedBox>
    </div>
  );
};

export default Home;
