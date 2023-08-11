import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Layout } from '@/components';
import { theme } from '@/config';
import { BlockchainNetworkProvider, CaptchaProvider, DAppProvider } from '@/contexts';

const EthereumFaucet = ({ Component, pageProps }: AppProps) => (
  <>
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Sepolia Faucet</title>
      </Head>
      <CaptchaProvider>
        <BlockchainNetworkProvider>
          <DAppProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </DAppProvider>
        </BlockchainNetworkProvider>
      </CaptchaProvider>
    </SessionProvider>
  </>
);

export default EthereumFaucet;
