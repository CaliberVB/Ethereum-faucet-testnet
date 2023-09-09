import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Copy, Item } from '@/components';
import { SelectBlockchainNetwork } from '../SelectNetwork';
import { useNetWork } from '@/hooks';

export const DonateInformation = () => {
  const { networkChain } = useNetWork();
  const isMobile = useMediaQuery('(max-width:900px)');
  const getAddress = () => {
    if (isMobile) return `${networkChain.walletAddress.slice(0, 12)}...${networkChain.walletAddress.slice(-6)}`;
    if (networkChain.name === 'aptos')
      return `${networkChain.walletAddress.slice(0, 30)}...${networkChain.walletAddress.slice(-12)}`;
    return networkChain.walletAddress;
  };
  return (
    <>
      <SelectBlockchainNetwork />
      <Item
        style={{
          paddingBottom: 6,
          paddingTop: 6,
        }}
      >
        <WalletIcon />
        <span>Address:</span>
        <span style={{ marginRight: 8 }}>{getAddress()}</span>
        <Copy textToCopy={networkChain.walletAddress} />
      </Item>
    </>
  );
};
