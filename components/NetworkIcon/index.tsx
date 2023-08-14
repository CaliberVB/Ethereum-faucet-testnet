import { SvgIcon } from '@mui/material';
import React from 'react';
import GoerliIcon from '@/public/assets/images/svg/goerli.svg';
import SepoliaIcon from '@/public/assets/images/svg/sepolia.svg';
import ArbitrumIcon from '@/public/assets/images/svg/arbitrum.svg';
import BaseIcon from '@/public/assets/images/svg/base.svg';
import OptimisticIcon from '@/public/assets/images/svg/optimistic.svg';
import BnbIcon from '@/public/assets/images/svg/bnb.svg';
import { Network } from '@/config';

const IconMapping = {
  goerli: <GoerliIcon />,
  sepolia: <SepoliaIcon />,
  arbitrum: <ArbitrumIcon />,
  base: <BaseIcon />,
  optimistic: <OptimisticIcon />,
  bnb: <BnbIcon />,
};

interface NetworkIconProps {
  name: Network;
}
export const NetworkIcon: React.FunctionComponent<NetworkIconProps> = ({ name }) => {
  return (
    <SvgIcon
      sx={{
        width: 24,
        height: 24,
        color: 'text.secondary',
      }}
    >
      {IconMapping[name]}
    </SvgIcon>
  );
};
