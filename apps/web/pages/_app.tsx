import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Layout } from '@/layout';
import { theme } from '@config';
import { BlockchainNetworkProvider, CaptchaProvider, DAppProvider } from '@/contexts';
import { ErrorBoundary, GoogleAnalytics } from '@/components';

console.log(123);

const EthereumFaucet = ({ Component, pageProps }: AppProps) => (
  <ErrorBoundary>
    <SessionProvider session={pageProps.session}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow"></meta>
        <meta name="author" content="caliber.build"></meta>

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://faucet.caliber.build/" />
        <meta property="og:image" content="/assets/images/seo-banner.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@Caliber" />
        <meta property="twitter:url" content="https://faucet.caliber.build/" />
        <meta property="twitter:image" content="/assets/images/seo-banner.png" />
        <link rel="canonical" href="https://faucet.caliber.build/" />
      </Head>
      <GoogleAnalytics />
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
