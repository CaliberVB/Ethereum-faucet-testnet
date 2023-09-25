import type { NextPage } from 'next';
import Head from 'next/head';
import { App } from '@/containers';

const MetaDataConfigs = {
  title: 'Testnet Faucet',
  description:
    'Our website offers a faucet token test net service on various blockchain networks such as Sepolia, Goerli, Mumbai, ARB, OP, BNB, BASE, and Aptos. Get free test net tokens to experiment and develop your applications on these networks. We also provide detailed information and guides related to blockchain and test net tokens.',
};
const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>{MetaDataConfigs.title}</title>
        <meta name="description" content={MetaDataConfigs.description} />

        <meta property="og:title" content={MetaDataConfigs.title} />
        <meta property="og:description" content={MetaDataConfigs.description} />

        <meta property="twitter:title" content={MetaDataConfigs.title} />
        <meta property="twitter:description" content={MetaDataConfigs.description} />
      </Head>
      <App />
    </main>
  );
};

export default Home;
