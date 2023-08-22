import { useFaucet } from '@/hooks/useFaucet';
import { useNetWork } from '@/hooks';
import { useAptosBalance } from '@/hooks/useAptosBalance';
import { Balance } from '@/components';
import { isInsufficientFund } from '@utils';
import { useEffect } from 'react';

interface FaucetBalanceProps {}

export const AptosBalance: React.FunctionComponent<FaucetBalanceProps> = () => {
  const { networkChain } = useNetWork();
  const { onSetIsInsufficientFund } = useFaucet(networkChain.name);
  const { balance } = useAptosBalance();
  const { balance: faucetBalance } = useAptosBalance(networkChain.walletAddress);
  useEffect(() => {
    onSetIsInsufficientFund(isInsufficientFund(networkChain, faucetBalance));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faucetBalance, networkChain]);
  const { retrieveAmount } = useFaucet(networkChain!.name);

  return (
    <div>
      <Balance
        faucetBalance={faucetBalance}
        walletBalance={balance}
        retrieveAmount={retrieveAmount?.toString()}
        networkChain={networkChain}
      />
    </div>
  );
};
