import type { AppProps } from "next/app"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { Goerli, Sepolia, DAppProvider, Config } from "@usedapp/core"
import Head from "next/head"
import { OpenSourceMemo } from "../components/OpenSourceMemo"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Layout } from "../components/Layout"
import { Content } from "../components/Content"
import { pollingInterval } from "../consts/env"
import { CaptchaProvider } from "../components/CaptchaProvider"
import { SessionProvider } from "next-auth/react"

const config: Config = {
  readOnlyChainId: Sepolia.chainId,
  readOnlyUrls: {
    [Sepolia.chainId]: process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA as string
  },
  pollingInterval
}
const theme = createTheme()

const EthereumFaucet = ({ Component, pageProps }: AppProps) => (
  <>
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Claim Testnet ETH</title>
      </Head>
      <CaptchaProvider>
        <DAppProvider config={config}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Content>
                <Header />
                <Component {...pageProps} />
                <OpenSourceMemo />
              </Content>
              <Footer />
            </Layout>
          </ThemeProvider>
        </DAppProvider>
      </CaptchaProvider>
    </SessionProvider>
  </>
)

export default EthereumFaucet
