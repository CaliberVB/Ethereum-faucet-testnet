import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

interface ConfirmConnectWalletProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  onConfirm: () => void;
}

export const ConfirmConnectWallet: React.FunctionComponent<ConfirmConnectWalletProps> = ({
  isOpen,
  onConfirm,
  onToggle,
}) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={() => onToggle(false)} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">Connect Wallet</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => onToggle(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText>
            <FormGroup>
              <FormControlLabel
                sx={{
                  alignItems: 'flex-start',
                }}
                control={
                  <Checkbox
                    sx={{
                      paddingTop: '4px',
                    }}
                    inputProps={{
                      'aria-label': 'Confirm connect wallet',
                    }}
                    onChange={() => onConfirm()}
                  />
                }
                label="By checking this box and moving forward, you confirm that you fully understand the risks of using Faucet
            application."
              />
            </FormGroup>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => onToggle(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
