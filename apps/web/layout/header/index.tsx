import { Box, Typography, Button, Link } from '@mui/material';
import Image from 'next/image';

export const Header = () => {
  // const { data: session, status } = useSession()

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open('https://twitter.com/CaliberBuild', '_blank');
  };
  return (
    <Box
      component="header"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={2}
      bgcolor="rgba(202, 236, 220, 0.2)" // semi-transparent background      color="inherit"
      height={40}
    >
      <Link href="caliber.build/" underline="none">
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontSize: '0.85rem', marginRight: 1, color: 'white', fontWeight: 'bold' }}
          >
            Powered by
          </Typography>

          <Box width={90} height={20}>
            <Image src="/assets/images/Caliber_White.png" alt="Caliber Logo" width={90} height={20} />
          </Box>
        </Box>
      </Link>
      <Button
        onClick={handleLogin}
        variant="outlined"
        sx={{
          color: 'white',
          borderColor: 'white',
          fontWeight: 'bold',
          '&:hover': {
            color: 'black',
            backgroundColor: 'white',
          },
        }}
        size="small"
      >
        Follow us!
      </Button>
    </Box>
  );
};
