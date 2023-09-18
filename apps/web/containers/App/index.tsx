'use client';
import { RoundedBox } from '@/components';
import { FaucetTitle } from '../FaucetTitle';
import { Faucet } from '../Faucet';
import { Donate } from '../Donate';
import { Box, Tab } from '@mui/material';
import { TabList, TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import { useState } from 'react';
import { AptosWalletProvider, DonateProvider } from '@/contexts';
import { Donators } from '../Donate/Donator';

const TabListStyle = {
  '&.MuiTabs-root': {
    background: 'linear-gradient(90deg, rgba(12,42,71,1) 0%, rgba(24,100,176,1) 55%, rgba(17,86,154,1) 100%)',
    padding: '6px 50px',
    borderTopLeftRadius: '17px',
    borderTopRightRadius: '15px',
    overflow: 'hidden',
    height: '36px',
  },
};

const TabStyle = {
  '&.MuiTab-root': {
    borderRadius: '8px',
    color: '#fff',
    minHeight: 'auto',
    height: '36px',
  },
  '&.Mui-selected': {
    backgroundColor: '#fff',
    color: '#000',
  },
};
export const App = () => {
  const [value, setValue] = useState('faucet');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <AptosWalletProvider>
      <FaucetTitle />
      <RoundedBox
        sx={{
          padding: '0px',
        }}
      >
        <TabContext value={value}>
          <TabList
            sx={TabListStyle}
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="faucet and donate tabs"
            TabIndicatorProps={{
              style: {
                display: 'none',
              },
            }}
          >
            <Tab value="faucet" label="Faucet" sx={TabStyle}></Tab>
            <Tab value="donate" label="Donate" sx={TabStyle} />
          </TabList>
          <TabPanel value="faucet">
            <Faucet />
          </TabPanel>
          <TabPanel value="donate">
            <DonateProvider>
              <Box
                sx={{
                  padding: '24px',
                }}
              >
                <Donate onDonateSuccess={() => {}} />
              </Box>
              <Donators />
            </DonateProvider>
          </TabPanel>
        </TabContext>
      </RoundedBox>
    </AptosWalletProvider>
  );
};
