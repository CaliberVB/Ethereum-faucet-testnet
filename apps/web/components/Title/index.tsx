import { Box, Typography } from '@mui/material';
import React from 'react';

interface FaucetTitleProps {
  title: string;
  subTitle: string;
}
export const Title: React.FunctionComponent<FaucetTitleProps> = ({ title, subTitle }) => {
  return (
    <Box px={2} py={1} marginTop={7} marginBottom={7}>
      <Typography variant="h2" align="center" color="white" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant="h5" align="center" color="white" sx={{ fontWeight: 'bold' }}>
        {subTitle}
      </Typography>
    </Box>
  );
};
