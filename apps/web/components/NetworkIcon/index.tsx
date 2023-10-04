import { SvgIcon } from '@mui/material';
import React from 'react';
import GoerliIcon from '../../public/assets/images/svg/goerli.svg';
import SepoliaIcon from '../../public/assets/images/svg/sepolia.svg';
import ArbitrumIcon from '../../public/assets/images/svg/arbitrum.svg';
import BaseIcon from '../../public/assets/images/svg/base.svg';
import OptimisticIcon from '../../public/assets/images/svg/optimism.svg';
import BnbIcon from '../../public/assets/images/svg/bnb.svg';
import MumbaiIcon from '../../public/assets/images/svg/mumbai.svg';
import AptosIcon from '../../public/assets/images/svg/aptos.svg';
import DoveIcon from '../../public/assets/images/svg/dove.svg';
import Holesky from '../../public/assets/images/svg/holesky.svg';
import { Network } from '@config';

const IconMapping = {
  holesky: <Holesky />,
  goerli: <GoerliIcon />,
  sepolia: <SepoliaIcon />,
  arbitrum: <ArbitrumIcon />,
  base: <BaseIcon />,
  optimism: <OptimisticIcon />,
  bnb: <BnbIcon />,
  mumbai: <MumbaiIcon />,
  aptos: <AptosIcon />,
  dove: <DoveIcon />,
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
