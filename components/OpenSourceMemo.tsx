import { Link as MuiLink } from "@mui/material"
import Link from "next/link"
import { RoundedBox } from "./RoundedBox"

export const OpenSourceMemo = () => (
  <div>
    
    
    <RoundedBox textAlign={"justify"}>
    
        <h2 className="alchemy-dialog-title">FAQs</h2>
        <p>-------------------------------------------------------------------------------------------------------------------------------------------</p>

        <b>How do I use this?</b>
        <p>To request funds, simply sign into Twitter, connect your wallet and sign a message to confirm your address ownership </p>
        <p>-------------------------------------------------------------------------------------------------------------------------------------------</p>

        <b>How does it work?</b>
        <p>You can request 0.1 Sepolia ETH every 24h with a twitter account and an address of your own!</p>
        <p>-------------------------------------------------------------------------------------------------------------------------------------------</p>

        <b>What is a testnet Ethereum faucet?</b>
        <p>An Ethereum faucet is a developer tool to get testnet Ether (ETH) in order to test and troubleshoot your decentralized application or protocol before going live on Ethereum mainnet, where one must use real Ether. Most faucets require social authentication (e.g. Twitter post or login confirming you are a real human) or place you in a queue to wait for a testnet token through the faucet. The Alchemy Goerli faucet is free, fast, and does not require authentication, though you can optionally login to Alchemy to get an increased drip.</p>
        <p>-------------------------------------------------------------------------------------------------------------------------------------------</p>

        <b>What is a testnet token?</b>
        <p>Testnet tokens are a test currency that allows you to test your Ethereum application before going live on mainnet. Testnet tokens can be used in place of mainnet Ether tokens on testnets like Goerli. You can read more <a href="https://www.alchemy.com/overviews/what-are-testnets" target="_blank" rel="noopener noreferrer">here</a>.</p>
        <p>-------------------------------------------------------------------------------------------------------------------------------------------</p>

        <b>The faucet confirmed that it sent me test tokens, but I still have not received them. Why is that?</b>
        <p>The time it takes for you to receive your test tokens may vary! This is because the network may be congested at this time, or the amount of gas we have set for these transactions may be a little low compared to other transactions that miners may choose to validate instead. </p>
        

        <p>-------------------------------------------------------------------------------------------------------------------------------------------</p>

        <b>What if I run into any other issues, or have questions?</b>
        <p style={{ marginBottom: '0px', paddingBottom: '0px' }}>Please kindly contact us at <Link href='mailto:hello@caliber.build'>hello@caliber.build</Link> <span></span>.</p>
        <p></p>
        <p>-------------------------------------------------------------------------------------------------------------------------------------------</p>
        <b>
        Also, if you have plenty of ETH, consider donate back to us at our faucet vault:{" "}
        {process.env.NEXT_PUBLIC_WALLET_ADDRESS}
      </b>
        
        
      </RoundedBox>
  </div>
)
