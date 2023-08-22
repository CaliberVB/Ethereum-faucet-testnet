import { EvmFaucet } from './Evm';
import { AptosFaucet } from './Aptos';
import { FaucetProvider } from '@/contexts';
import { SelectBlockchainNetwork } from '../SelectNetwork';
import { useNetWork } from '@/hooks';

interface FaucetProps {}

export const Faucet: React.FunctionComponent<FaucetProps> = () => {
  const { networkChain } = useNetWork();
  return (
    <div>
      <SelectBlockchainNetwork />
      <FaucetProvider>
        {networkChain.name === 'aptos' && <AptosFaucet />}
        {networkChain.name !== 'aptos' && <EvmFaucet />}
      </FaucetProvider>
    </div>
  );
};
