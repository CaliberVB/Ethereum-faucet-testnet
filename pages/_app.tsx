import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Layout } from '@/layout';
import { theme } from '@/config';
import { BlockchainNetworkProvider, CaptchaProvider, DAppProvider } from '@/contexts';
import { ErrorBoundary } from '@/components';

const EthereumFaucet = ({ Component, pageProps }: AppProps) => (
  <ErrorBoundary>
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Testnet Faucet</title>
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
  </ErrorBoundary>
);

export default EthereumFaucet;
