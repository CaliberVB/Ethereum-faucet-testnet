import { useMemo } from 'react';
import { DonateInformation } from './DonateInformation';
import { EvmDonate } from './Evm';
import { AptosDonate } from './Aptos';
import { useNetWork } from '@/hooks';

interface DonateProps {
  onDonateSuccess: () => void;
}

export const Donate: React.FunctionComponent<DonateProps> = ({ onDonateSuccess }) => {
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
    <>
      <DonateInformation />
      {donateView}
    </>
  );
};
