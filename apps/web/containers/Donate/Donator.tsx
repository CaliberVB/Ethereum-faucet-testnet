import { useState, useEffect, useCallback, useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Box, CircularProgress } from '@mui/material';
import { NetworkIcon } from '@/components';
import { Donator } from '@interface';
import { getDonators } from '@apiService';
import { getAppConfig } from '@config';
import { DonateContext } from '@/contexts';
import Link from 'next/link';
import Image from 'next/image';

const FoundationTeams = [
  {
    image: 'bnb',
    name: 'BNB chain Foundation',
    link: 'https://www.bnbchain.org/en',
  },
  {
    image: 'arbitrum',
    name: 'Arbitrum Foundation',
    link: 'https://arbitrum.foundation/',
  },
  {
    image: 'polygon',
    name: 'Polygon Foundation',
    link: 'https://polygon.technology/',
  },
];

export const Donators: React.ForwardRefRenderFunction<HTMLDivElement, {}> = (props, ref) => {
  const [donators, setDonators] = useState<Donator[]>([]);
  const [loading, setLoading] = useState(false);
  const { blockchainNetworks } = getAppConfig();
  const { donateId } = useContext(DonateContext);

  const getListDonators = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDonators();
      setDonators(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getListDonators();
  }, [getListDonators, donateId]);
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: '#F4F4F4',
        borderRadius: '8px',
        padding: '24px 16px',
      }}
    >
      <Box
        component="h3"
        sx={{
          fontSize: '18px',
          textAlign: 'center',
          color: '#767676',
          marginTop: 0,
        }}
      >
        DONATORS
      </Box>
      <Box
        component="h5"
        sx={{
          fontSize: '14px',
          fontWeight: 'regular',
          marginTop: '24px',
        }}
      >
        We extend our heartfelt appreciation to the foundation teams, for generously donating testnet tokens that
        sustain our faucet&apos;s operation.
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '60px',
        }}
      >
        {FoundationTeams.map((f) => {
          return (
            <Link href={f.link} target="_blank" key={f.name} aria-label={f.name}>
              <Image width={48} height={48} src={`/assets/images/svg/${f.image}.svg`} alt={f.name} />
            </Link>
          );
        })}
      </Box>
      <Box
        component="h5"
        sx={{
          fontSize: '14px',
          fontWeight: 'regular',
          marginTop: '24px',
        }}
      >
        We would also like to express our gratitude to the anonymous contributors whose support has been invaluable.
        Your contributions fuel our mission and drive the growth of blockchain technology.
      </Box>
      <List sx={{ width: '100%', maxHeight: 400, overflow: 'auto' }}>
        {donators.map((donate) => {
          return (
            <ListItem
              key={donate.id}
              sx={{
                marginBottom: '8px',
                borderRadius: '8px',
                padding: '4px ',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: '#e2e6ec',
                },
              }}
            >
              <ListItemAvatar
                sx={{
                  minWidth: '46px',
                }}
              >
                <Avatar>
                  <NetworkIcon name={donate.networkName} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{
                  wordBreak: 'break-all',
                  '&>span': {
                    fontSize: '14px',
                  },
                }}
              >
                <Link
                  href={`${blockchainNetworks[donate.networkName]?.blockscanUrl.replace('{txhash}', donate.hash)}`}
                  passHref
                  target="_blank"
                  title="Click to view details"
                >
                  {donate.address}
                </Link>
              </ListItemText>
              <ListItemText
                sx={{
                  textAlign: 'right',
                  marginRight: '8px',
                  '&>span': {
                    fontSize: '14px',
                  },
                }}
              >
                <span
                  style={{
                    color: 'black',
                    fontWeight: '600',
                  }}
                >
                  {donate.amount}
                </span>{' '}
                {blockchainNetworks[donate.networkName].nativeAsset}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};
