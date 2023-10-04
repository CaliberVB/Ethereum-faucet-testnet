import { formatEther } from 'ethers/lib/utils';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { useFaucet } from '@/hooks/useFaucet';
import { useDoveBalance, useHoleskyBalance, useNetWork } from '@/hooks';
import { getAppConfig } from '@config';
import { Balance } from '@/components';
import { isInsufficientFund } from '@utils';
import { useEffect } from 'react';

interface FaucetBalanceProps {}

export const EVMBalance: React.FunctionComponent<FaucetBalanceProps> = () => {
  const { walletAddress } = getAppConfig();
  const { account } = useEthers();
  const { networkChain } = useNetWork();
  const { onSetIsInsufficientFund } = useFaucet(networkChain.name);
  const { doveBalance, doveFaucetBalance } = useDoveBalance();
  const { holeskyBalance, holeskyFaucetBalance } = useHoleskyBalance();

  const balance = useEtherBalance(account, { refresh: 'everyBlock', chainId: networkChain.chainId });
  const faucetBalance = useEtherBalance(walletAddress, { refresh: 'everyBlock', chainId: networkChain.chainId });

  const { retrieveAmount } = useFaucet(networkChain!.name);
  const faucetBalanceStr = faucetBalance && formatEther(faucetBalance);

  useEffect(() => {
    onSetIsInsufficientFund(isInsufficientFund(networkChain, faucetBalanceStr));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faucetBalanceStr, networkChain]);
  let balanceDisplay = balance;
  let faucetBalanceDisplay = faucetBalanceStr;

  if (networkChain.name === 'dove') {
    balanceDisplay = doveBalance;
    faucetBalanceDisplay = doveFaucetBalance;
  }
  if (networkChain.name === 'holesky') {
    balanceDisplay = holeskyBalance;
    faucetBalanceDisplay = holeskyFaucetBalance;
  }
  return (
    <div>
      <Balance
        faucetBalance={faucetBalanceDisplay}
        walletBalance={balanceDisplay && formatEther(balanceDisplay)}
        retrieveAmount={retrieveAmount?.toString()}
        networkChain={networkChain}
      />
    </div>
  );
};
