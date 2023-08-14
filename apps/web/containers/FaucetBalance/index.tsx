import { formatEther } from 'ethers/lib/utils';
import { useEtherBalance, useEthers } from '@usedapp/core';
import ClaimIcon from '@mui/icons-material/GetApp';
import { Box, FormControl, SvgIcon, MenuItem } from '@mui/material';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { BalanceItem, Item, NetworkIcon, Select } from '@/components';
import { useFaucet } from '@/hooks/useFaucet';
import { useNetWork } from '@/hooks';
import { IBlockchainConfig, getAppConfig } from '@/config';
import BlockchainIcon from '../../public/assets/images/svg/blockchain.svg';

const Option: React.FunctionComponent<IBlockchainConfig> = ({ name }) => {
  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <NetworkIcon name={name} />
      <span style={{ textTransform: 'capitalize', marginLeft: 8 }}>{name}</span>
    </Box>
  );
};

interface FaucetBalanceProps {}

export const FaucetBalance: React.FunctionComponent<FaucetBalanceProps> = () => {
  const { walletAddress, blockchainNetworks } = getAppConfig();

  const { account } = useEthers();
  const { onSelectNetworkChain, networkChain } = useNetWork();

  const balance = useEtherBalance(account, { refresh: 'everyBlock', chainId: networkChain.chainId });
  const faucetBalance = useEtherBalance(walletAddress, { refresh: 'everyBlock', chainId: networkChain.chainId });

  const { retrieveAmount, nativeAsset } = useFaucet(networkChain!.name);

  return (
    <div>
      <Item
        style={{
          padding: '0 0 0 16px',
        }}
      >
        <SvgIcon>
          <BlockchainIcon />
        </SvgIcon>
        <span>Network</span>
        <FormControl size="small">
          <Select
            noBorders
            value={networkChain}
            renderValue={Option}
            onChange={(event) => onSelectNetworkChain?.(event.target.value as IBlockchainConfig)}
          >
            {Object.entries(blockchainNetworks).map(([key, value]) => {
              return (
                <MenuItem key={key} value={value as any} style={{ textTransform: 'capitalize', borderRadius: 6 }}>
                  <Option {...value} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Item>
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
