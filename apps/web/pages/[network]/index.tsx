import type { InferGetServerSidePropsType, NextPage } from 'next';
import { App } from '@/containers';
import Head from 'next/head';
const MetaDataConfigs = {
  default: {
    title: 'Testnet Faucet',
    description:
      'Our website offers a faucet token test net service on various blockchain networks such as Holesky, Sepolia, Goerli, Mumbai, ARB, OP, BNB, BASE, and Aptos. Get free test net tokens to experiment and develop your applications on these networks. We also provide detailed information and guides related to blockchain and test net tokens.',
  },
  holesky: {
    title: 'Holesky Testnet Faucet',
    description:
      'A fast and reliable Ethereum Holesky testnet faucet for blockchain developers. Get free test net tokens to experiment and develop your applications on these networks. We also provide token test net service on various blockchain networks such as Sepolia, Goerli, Mumbai, ARB, OP, BNB, BASE, and Aptos',
  },
  sepolia: {
    title: 'Sepolia Testnet Faucet',
    description:
      'A fast and reliable Ethereum Sepolia testnet faucet for blockchain developers. Get free test net tokens to experiment and develop your applications on these networks. We also provide token test net service on various blockchain networks such as Sepolia, Goerli, Mumbai, ARB, OP, BNB, BASE, and Aptos',
  },
  goerli: {
    title: 'Goerli Testnet Faucet',
    description:
      'A fast and reliable Ethereum Goerli testnet faucet for blockchain developers. Get free test net tokens to experiment and develop your applications on these networks. We also provide token test net service on various blockchain networks such as Sepolia, Goerli, Mumbai, ARB, OP, BNB, BASE, and Aptos',
  },
  base: {
    title: 'Base Testnet Faucet',
    description:
      'A fast and reliable Ethereum Base testnet faucet for blockchain developers. Get free test net tokens to experiment and develop your applications on these networks. We also provide token test net service on various blockchain networks such as Sepolia, Goerli, Mumbai, ARB, OP, BNB, BASE, and Aptos',
  },
  arbitrum: {
    title: 'Arbitrum Testnet Faucet',
    description:
      'A fast and reliable Ethereum arbitrum testnet faucet for blockchain developers. Get free test net tokens to experiment and develop your applications on these networks. We also provide token test net service on various blockchain networks such as Sepolia, Goerli, Mumbai, ARB, OP, BNB, BASE, and Aptos',
  },
  bnb: {
    title: 'BNB Testnet Faucet',
    description:
      'A fast and reliable Ethereum BNB testnet faucet for blockchain developers. Get free test net tokens to experiment and develop your applications on these networks. We also provide token test net service on various blockchain networks such as Sepolia, Goerli, Mumbai, ARB, OP, BNB, BASE, and Aptos',
  },
  mumbai: {
    title: 'Mumbai Testnet Faucet',
    description:
      'A fast and reliable Matic Mumbai testnet faucet for blockchain developers. Get free test net tokens to experiment and develop your applications on these networks. We also provide token test net service on various blockchain networks such as Sepolia, Goerli, Mumbai, ARB, OP, BNB, BASE, and Aptos',
  },
  optimism: {
    title: 'Optimism Testnet Faucet',
    description:
      'A fast and reliable Ethereum optimism testnet faucet for blockchain developers. Get free test net tokens to experiment and develop your applications on these networks. We also provide token test net service on various blockchain networks such as Sepolia, Goerli, Mumbai, ARB, OP, BNB, BASE, and Aptos',
  },
  dove: {
    title: 'Dove Testnet Faucet',
    description:
      'A fast and reliable Dove testnet faucet for blockchain developers. Get free test net tokens to experiment and develop your applications on these networks. We also provide token test net service on various blockchain networks such as Sepolia, Goerli, Mumbai, ARB, OP, BNB, BASE, and Aptos',
  },
  aptos: {
    title: 'Aptos Testnet Faucet',
    description:
      'A fast and reliable Aptos testnet faucet for blockchain developers. Get free test net tokens to experiment and develop your applications on these networks. We also provide token test net service on various blockchain networks such as Sepolia, Goerli, Mumbai, ARB, OP, BNB, BASE, and Aptos',
  },
};

export const getServerSideProps = async (context) => {
  const { network } = context.query;

  return {
    props: {
      network: network,
    },
  };
};
const NetworkChain: NextPage = ({ network }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const metaConfig = MetaDataConfigs[network] || MetaDataConfigs.default;
  return (
    <main>
      <Head>
        <title>{metaConfig.title}</title>

        <meta name="description" content={metaConfig.description} />

        <meta property="og:title" content={metaConfig.title} />
        <meta property="og:description" content={metaConfig.description} />

        <meta property="twitter:title" content={metaConfig.title} />
        <meta property="twitter:description" content={metaConfig.description} />
      </Head>
      <App />
    </main>
  );
};

export default NetworkChain;
