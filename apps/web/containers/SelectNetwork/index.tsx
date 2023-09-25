import { Item, NetworkIcon, Select } from '@/components';
import { Box, FormControl, SvgIcon, MenuItem } from '@mui/material';
import BlockChainIcon from '../../public/assets/images/svg/blockchain.svg';
import { IBlockchainConfig, getAppConfig } from '@config';
import { useNetWork } from '@/hooks';
import Link from 'next/link';

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

export const SelectBlockchainNetwork = () => {
  const { onSelectNetworkChain, networkChain } = useNetWork();
  const { blockchainNetworks } = getAppConfig();

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
                <MenuItem
                  key={key}
                  value={value as any}
                  style={{ textTransform: 'capitalize', borderRadius: 6, paddingLeft: 0, paddingRight: 0 }}
                >
                  <Link
                    href={`/${value.name}`}
                    style={{
                      width: '100%',
                      padding: '0px 8px',
                      textDecoration: 'none',
                      color: '#000',
                    }}
                  >
                    <Option {...value} />
                  </Link>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Item>
    </div>
  );
};
