import { Config, Sepolia, DAppProvider as DAppProviderCore } from '@usedapp/core';

import { getAppConfig } from '@/config';

export const DAppProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
  const { pollingInterval } = getAppConfig();
  const config: Config = {
    readOnlyChainId: Sepolia.chainId,
    readOnlyUrls: {
      [Sepolia.chainId]: process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA as string,
    },
    pollingInterval,
  };
  return <DAppProviderCore config={config}>{children}</DAppProviderCore>;
};
