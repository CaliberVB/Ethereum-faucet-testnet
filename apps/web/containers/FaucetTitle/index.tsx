import { Title } from '@/components';
import { useNetWork } from '@/hooks';

export const FaucetTitle = () => {
  const { networkChain } = useNetWork();

  return (
    <Title
      title={`${networkChain.displayName} Faucet`}
      subTitle={`Fast and Reliable Source of ${networkChain.displayName}  ${networkChain.defaultDailyAmount} ${networkChain.nativeAsset}/day`}
    />
  );
};
