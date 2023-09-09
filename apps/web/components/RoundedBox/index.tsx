import { Box, styled } from '@mui/material';

export const RoundedBox = styled(Box)(({ theme }) => ({
  background: '#F8F8F8', // Replace with your desired color
  borderRadius: theme.shape.borderRadius,
  margin: `${theme.spacing(2)} auto`,
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  minWidth: 'auto',
  maxWidth: theme.spacing(80),
  width: '100%',

  ...theme.typography.body2,
}));
