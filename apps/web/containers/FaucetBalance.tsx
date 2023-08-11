import { formatEther } from 'ethers/lib/utils';
import { useEtherBalance, useEthers } from '@usedapp/core';
import ClaimIcon from '@mui/icons-material/GetApp';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { BalanceItem } from '@/components';
import { useFaucet } from '@/hooks/useFaucet';
import { useNetWork } from '@/hooks';
import { getAppConfig } from '@/config';

interface FaucetBalanceProps {}

export const FaucetBalance: React.FunctionComponent<FaucetBalanceProps> = () => {
  const { walletAddress } = getAppConfig();
  const { account } = useEthers();
  const balance = useEtherBalance(account, { refresh: 'everyBlock' });
  const faucetBalance = useEtherBalance(walletAddress, { refresh: 'everyBlock' });

  const network = useNetWork();

  const { retrieveAmount, nativeAsset } = useFaucet(network!.key);

  return (
    <div>
      <BalanceItem
        icon={<WalletIcon />}
        title="Your wallet balance"
        balance={balance && formatEther(balance)}
        symbol={nativeAsset}
      />
      <BalanceItem
        icon={<WalletIcon />}
        title="Faucet balance"
        balance={faucetBalance && formatEther(faucetBalance)}
        symbol={nativeAsset}
      />
      <BalanceItem
        icon={<ClaimIcon />}
        title="Claimable Sepolia ETH"
        balance={retrieveAmount?.toString()}
        symbol={nativeAsset}
      />
    </div>
  );
};
