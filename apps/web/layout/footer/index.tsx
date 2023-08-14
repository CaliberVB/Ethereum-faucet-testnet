import { Link as MuiLink, styled } from '@mui/material';

const FooterElement = styled('footer')(({ theme }) => ({
  margin: `${theme.spacing(1)} auto`,
  padding: theme.spacing(4),
  minWidth: theme.spacing(40),
  maxWidth: theme.spacing(70),
  width: '100%',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.typography.body2,
}));

export const Footer = () => {
  return (
    <FooterElement>
      <MuiLink href="https://github.com/CaliberVB/Ethereum-faucet-testnet" underline="none" sx={{ color: 'white' }}>
        Made with ❤️ by Caliber team
      </MuiLink>
    </FooterElement>
  );
};
