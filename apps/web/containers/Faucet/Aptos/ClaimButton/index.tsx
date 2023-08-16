import Link from 'next/link';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useWallet, Wallet } from '@aptos-labs/wallet-adapter-react';
import Image from 'next/image';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { claimTokens, retrieveNonce } from '@apiService';
import { messageTemplate } from '@utils';
import { useNetWork } from '@/hooks';
import { BaseClaimButtonProps } from '../../Evm/ClaimButton/_BaseClaimButton';
import { LoadingButton } from '@/components';

export const ClaimButton: React.FunctionComponent<BaseClaimButtonProps> = ({ onError, onSuccess, retrieveCaptcha }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const { wallets, connect, wallet, signMessage, account } = useWallet();
  const { networkChain } = useNetWork();
  const handleConnectWallet = async (wallet: Wallet) => {
    try {
      connect(wallet.name);
      setOpenDialog(false);
    } catch (error) {
      console.error(`Connect to ${wallet.name} failed`, error);
    }
  };

  const handleToggleDialogConnectWallet = (open: boolean) => {
    setOpenDialog(open);
  };
  const handleFaucet = async () => {
    try {
      setIsClaiming(true);
      const captchaToken = await retrieveCaptcha?.();
      const nonce = await retrieveNonce();
      const message = messageTemplate(nonce);
      const signedData = await signMessage({
        message: message,
        nonce: nonce,
      });
      const txHash = await claimTokens({
        address: account.address,
        message: message,
        network: networkChain.name,
        signature: signedData.signature as string,
        captcha: captchaToken,
      });
      onSuccess(txHash.message);
    } catch (error) {
      console.error('Faucet APT error', error);
      onError(error.response.data.message);
    } finally {
      setIsClaiming(false);
    }
  };
  return (
    <Box>
      <LoadingButton
        fullWidth
        variant="contained"
        onClick={() => {
          if (!wallet) return handleToggleDialogConnectWallet(true);
          handleFaucet();
        }}
        loadingPosition="end"
        endIcon={<span></span>}
        loading={isClaiming}
      >
        {wallet ? 'Claim APT' : 'Connect Wallet'}
      </LoadingButton>
      <Dialog open={openDialog} maxWidth="xs" fullWidth>
        <DialogTitle
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 0,
            paddingTop: 0,
          }}
        >
          <h3
            style={{
              margin: '12px 0 0 0',
            }}
          >
            Connect a Wallet
          </h3>
          <IconButton
            sx={{
              width: 36,
              height: 36,
            }}
            aria-label="Close"
            onClick={() => handleToggleDialogConnectWallet(false)}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <List>
          {wallets.map((wallet) => (
            <ListItem disableGutters key={wallet.name}>
              <ListItemButton
                onClick={() => handleConnectWallet(wallet)}
                sx={{
                  backgroundColor: 'rgb(228, 228, 231)',
                  margin: '0px 12px',
                  borderRadius: '12px',
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <Image src={wallet.icon} alt={wallet.name} fill></Image>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={wallet.name} />
                {wallet.provider ? (
                  <Button size="small" variant="outlined">
                    Connect
                  </Button>
                ) : (
                  <Button
                    size="small"
                    sx={{
                      width: '76px',
                    }}
                  >
                    <Link
                      href={wallet.url}
                      target="_blank"
                      style={{
                        textDecoration: 'none',
                      }}
                    >
                      Install
                    </Link>
                  </Button>
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </Box>
  );
};
