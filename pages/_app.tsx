import type { AppProps } from "next/app"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { Sepolia, DAppProvider, Config } from "@usedapp/core"
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
const theme = createTheme({
  typography: {
    fontFamily: '"Barlow", sans-serif',  // Use Barlow font
  },
  palette: {
    background: {
      default: 'white', 
    },
  },
  shape: {
    borderRadius: 17, // adjust this to your liking
  },
  components: {
    // MuiCssBaseline: {
    //   styleOverrides: {
    //     body: {
    //       backgroundColor: 'pink', 
    //     },
    //   },
    // },
  },
})

const EthereumFaucet = ({ Component, pageProps }: AppProps) => (
  <>
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Sepolia Faucet</title>
      </Head>
      <CaptchaProvider>
        <DAppProvider config={config}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Content>
                {/* <Header /> */}
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
