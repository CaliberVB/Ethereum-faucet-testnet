import React from 'react';

import { Network } from '@/config';
import Image from 'next/image';

const IconMapping = {
  goerli: '/assets/images/svg/goerli.svg',
  sepolia: '/assets/images/svg/sepolia.svg',
  arbitrum: '/assets/images/svg/arbitrum.svg',
  base: '/assets/images/svg/base.svg',
  optimistic: '/assets/images/svg/optimistic.svg',
  bnb: '/assets/images/svg/bnb.svg',
};

interface NetworkIconProps {
  name: Network;
}

export const NetworkIcon: React.FunctionComponent<NetworkIconProps> = ({ name }) => {
  return <Image width={24} height={24} color="text.secondary" alt="icon" src={IconMapping[name]} />;
};
