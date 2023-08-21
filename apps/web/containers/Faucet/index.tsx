import { Box, FormControl, SvgIcon, MenuItem } from '@mui/material';
import { Item, NetworkIcon, Select } from '@/components';
import { useNetWork } from '@/hooks';
import { IBlockchainConfig, getAppConfig } from '@config';
import BlockChainIcon from '../../public/assets/images/svg/blockchain.svg';
import { EvmFaucet } from './Evm';
import { AptosFaucet } from './Aptos';
import { FaucetProvider } from '@/contexts';

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

interface FaucetProps {}

export const Faucet: React.FunctionComponent<FaucetProps> = () => {
  const { blockchainNetworks } = getAppConfig();
  const { onSelectNetworkChain, networkChain } = useNetWork();

  return (
    <div>
      <Item
        style={{
          padding: '0 0 0 16px',
        }}
      >
        <SvgIcon>
          <BlockChainIcon />
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
      <FaucetProvider>
        {networkChain.name === 'aptos' && <AptosFaucet />}
        {networkChain.name !== 'aptos' && <EvmFaucet />}
      </FaucetProvider>
    </div>
  );
};
