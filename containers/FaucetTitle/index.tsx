import { Title } from '@/components';
import { useNetWork } from '@/hooks';
import { displayNetworkChainAndSymbol } from '@/utils';

export const FaucetTitle = () => {
  const { networkChain } = useNetWork();

  return (
    <Title
      title={`${networkChain.displayName} Faucet`}
      subTitle={`Fast and Reliable Source of ${displayNetworkChainAndSymbol(networkChain, true)}/day`}
    />
  );
};
