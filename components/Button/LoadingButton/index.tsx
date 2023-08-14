import { LoadingButton as MaterialLoadingButton } from '@mui/lab';
import { styled } from '@mui/material';

export const LoadingButton = styled(MaterialLoadingButton)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  margin: '2px',
  padding: '3px',
  paddingLeft: '10px',
  backgroundColor: '#0061e2',
  color: 'white',
  borderRadius: '8px',
  textDecoration: 'none',
}));
