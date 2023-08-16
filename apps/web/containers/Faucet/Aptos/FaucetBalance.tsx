import { useFaucet } from '@/hooks/useFaucet';
import { useNetWork } from '@/hooks';
import { useAptosBalance } from '@/hooks/useAptosBalance';
import { Balance } from '@/components';

interface FaucetBalanceProps {}

export const AptosBalance: React.FunctionComponent<FaucetBalanceProps> = () => {
  const { networkChain } = useNetWork();

  const { balance } = useAptosBalance();
  const { balance: faucetBalance } = useAptosBalance(
    '0x93b88aa53f39625881fdc69de59245cb680ea3e3f8418a48786a898138971824',
  );

  const { retrieveAmount } = useFaucet(networkChain!.name);

  return (
    <div>
      <Balance
        balance={{
          faucetBalance: faucetBalance,
          walletBalance: balance,
          retrieveAmount: retrieveAmount?.toString(),
        }}
        networkChain={networkChain}
      />
    </div>
  );
};
