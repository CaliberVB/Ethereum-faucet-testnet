import { memo } from 'react';
import ClaimIcon from '@mui/icons-material/GetApp';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { BalanceItem } from '@/components';
import { displayNetworkChainAndSymbol } from '@utils';
import { IBlockchainConfig } from '@config';

interface BalanceProps {
  walletBalance: string;
  faucetBalance: string;
  retrieveAmount: string;
  networkChain: IBlockchainConfig;
}

export const BalanceComponent: React.FunctionComponent<BalanceProps> = ({
  faucetBalance,
  retrieveAmount,
  walletBalance,
  networkChain,
}) => {
  return (
    <>
      <BalanceItem
        icon={<WalletIcon />}
        title="Your wallet balance"
        balance={walletBalance}
        symbol={networkChain.nativeAsset}
      />
      <BalanceItem
        icon={<WalletIcon />}
        title="Faucet balance"
        balance={faucetBalance}
        symbol={networkChain.nativeAsset}
      />
      <BalanceItem
        icon={<ClaimIcon />}
        title={`Claimable ${displayNetworkChainAndSymbol(networkChain)}`}
        balance={retrieveAmount?.toString()}
        symbol={networkChain.nativeAsset}
      />
    </>
  );
};
export const Balance = memo(BalanceComponent);
