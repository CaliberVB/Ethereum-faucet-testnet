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
  if (donators?.length < 1) return null;
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Box
        component="h3"
        sx={{
          textAlign: 'center',
          fontSize: '18px',
          marginBottom: 0,
        }}
      >
        DONATORS
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
