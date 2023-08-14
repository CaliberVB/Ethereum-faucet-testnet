import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: '"Barlow", sans-serif', // Use Barlow font
  },
  palette: {
    background: {
      default: 'white',
    },
  },
  shape: {
    borderRadius: 17, // adjust this to your liking
  },
  components: {},
});
