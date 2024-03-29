import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { RoundedBox } from '../RoundedBox';
import { getAppConfig } from '@config';
import { styled } from '@mui/material';

export const Dashed = styled('p')(() => ({
  borderBottom: '1px dashed',
}));
export const OpenSourceMemo = () => {
  const { walletAddress } = getAppConfig();

  return (
    <section>
      <RoundedBox textAlign="justify">
        <h2 className="alchemy-dialog-title">FAQs</h2>
        <Dashed></Dashed>

        <b>How do i use this platform?</b>
        <p>
          1. Login with your Twitter account to verify yourself as a real human!
          <br />
          2. Connect and sign message off-chain in your wallet provider (Metamask) to confirm your wallet ownership
          <br />
          3. View balance of the faucet and press claim! Very simple right?
        </p>

        <Dashed></Dashed>

        <b>How does this process work</b>
        <p>
          Well, you can request 0.1 testnet ETH (Sepolia every 24 hours using your Twitter account and an address that
          belongs to you. it’s like your daily drip of crypto!
        </p>
        <Dashed></Dashed>

        <b>What exactly is an Ethereum testnet faucet?</b>
        <p>
          Great question! An Ethereum faucet is essentially a helpful tool for developers. it provides you with testnet
          Ether (ETH) which you can use to test and troubleshoot your decentralized app or protocol before launching it
          on the Ethereum mainnet. This way, you don’t need to risk real Ether during the testing process.{' '}
        </p>
        <Dashed></Dashed>

        <b>What is a testnet token?</b>
        <p>
          Testnet tokens are a test currency that allows you to test your application before going live on the mainnet.
          Testnet tokens can be used in place of mainnet Ether tokens on testnets like Sepolia/Goerli. The Caliber
          testnet faucet currently supports Sepolia, Goerli, Mumbai, Base, Arbitrum, Optimism, and the Bnb Network. You
          can read more about testnets here.{' '}
          <a href="https://www.alchemy.com/overviews/what-are-testnets" target="_blank" rel="noopener noreferrer">
            here
          </a>
          .
        </p>
        <Dashed></Dashed>

        <b>The faucet confirmed that it sent me test tokens, but i still have not received them. Why is that?</b>
        <p>
          Ah, the waiting game! Sometimes, the time it takes for you to receive your test tokens can vary. This could be
          due to network congestion, or the gas set for these transactions might be a tad low compared to other
          transactions that miners validate first. But hang in there, your tokens should arrive eventually!{' '}
        </p>

        <Dashed></Dashed>

        <b>What if i run into any other issues, or have questions?</b>
        <p style={{ marginBottom: '0px', paddingBottom: '0px' }}>
          if you hit any snags or just want to know more, don’t hesitate to drop us a line at{' '}
          <Link href="mailto:hello@caliber.build">hello@caliber.build</Link>. We’re here to help!
        </p>
        <p></p>
        <Dashed></Dashed>
        <b>
          <span
            style={{
              textAlign: 'left',
            }}
          >
            And hey, if you find yourself rolling in testnet ETH, consider giving back to our faucet vault at:
          </span>
        </b>
        <b>
          <span
            style={{
              wordWrap: 'break-word',
            }}
          >
            {walletAddress}.
          </span>
        </b>

        <b>
          <p> </p>Every bit helps us keep this public service running smoothly!
        </b>
      </RoundedBox>
      <RoundedBox textAlign={'justify'}>
        <p>
          If you’re curious about Caliber, the leading Web3 ventures studio, or if you’re interested in collaborating
          with us to build something truly innovative in the Web3 space, we’d love to hear from you. Visit our{' '}
          <MuiLink href="https://caliber.build/" underline="none">
            website
          </MuiLink>{' '}
          or drop us an email at{' '}
          <MuiLink href="https://caliber.build/" underline="none">
            hello@caliber.build
          </MuiLink>
          .{' '}
        </p>
        <p>Let’s explore the future of Web3 together!</p>
      </RoundedBox>
    </section>
  );
};
