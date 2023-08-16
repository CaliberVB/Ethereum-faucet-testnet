import type { NextPage } from 'next';
import { RoundedBox } from '@/components';
import { FaucetTitle } from '@/containers';
import { Faucet } from '@/containers/Faucet';

const Home: NextPage = () => {
  return (
    <div>
      <FaucetTitle />
      <RoundedBox>
        <Faucet />
      </RoundedBox>
    </div>
  );
};

export default Home;
