import { formatEther } from 'ethers/lib/utils';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { useFaucet } from '@/hooks/useFaucet';
import { useNetWork } from '@/hooks';
import { getAppConfig } from '@config';
import { Balance } from '@/components';

interface FaucetBalanceProps {}

export const EVMBalance: React.FunctionComponent<FaucetBalanceProps> = () => {
  const { walletAddress } = getAppConfig();

  const { account } = useEthers();
  const { networkChain } = useNetWork();

  const balance = useEtherBalance(account, { refresh: 'everyBlock', chainId: networkChain.chainId });
  const faucetBalance = useEtherBalance(walletAddress, { refresh: 'everyBlock', chainId: networkChain.chainId });

  const { retrieveAmount } = useFaucet(networkChain!.name);

  return (
    <div>
      <Balance
        balance={{
          faucetBalance: faucetBalance && formatEther(faucetBalance),
          walletBalance: balance && formatEther(balance),
          retrieveAmount: retrieveAmount?.toString(),
        }}
        networkChain={networkChain}
      />
    </div>
  );
};
