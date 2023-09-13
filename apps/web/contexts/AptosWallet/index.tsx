import { PropsWithChildren } from 'react';
import { MartianWallet } from '@martianwallet/aptos-wallet-adapter';
import { PontemWallet } from '@pontem/wallet-adapter-plugin';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { FewchaWallet } from 'fewcha-plugin-wallet-adapter';
import { RiseWallet } from '@rise-wallet/wallet-adapter';
import { MSafeWalletAdapter } from 'msafe-plugin-wallet-adapter';

export const AptosWalletProvider: React.FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  const wallets = [
    new MartianWallet(),
    new PontemWallet(),
    new PetraWallet(),
    new FewchaWallet(),
    new RiseWallet(),
    new MSafeWalletAdapter(),
  ];
  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={false}
      onError={(error) => {
        console.error('Aptops wallet connect error', error);
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};
