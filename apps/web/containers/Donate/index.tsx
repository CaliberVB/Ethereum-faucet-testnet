import { useMemo } from 'react';
import { DonateProvider } from '@/contexts';
import { DonateInformation } from './DonateInformation';
import { EvmDonate } from './Evm';
import { AptosDonate } from './Aptos';
import { useNetWork } from '@/hooks';

interface DonateProps {}

export const Donate: React.FunctionComponent<DonateProps> = () => {
  const { networkChain } = useNetWork();

  const donateView = useMemo(() => {
    switch (networkChain.name) {
      case 'aptos':
        return <AptosDonate />;
      default:
        return <EvmDonate />;
    }
  }, [networkChain.name]);

  return (
    <DonateProvider>
      <DonateInformation />
      {donateView}
    </DonateProvider>
  );
};
