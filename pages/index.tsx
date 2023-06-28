import type { NextPage } from "next"
import { formatEther } from "@ethersproject/units"
import { useEtherBalance, useEthers } from "@usedapp/core"
import { useCallback, useReducer } from "react"
import { Alert } from "../components/Alert"
import { ClaimButton } from "../components/ClaimButton"
import { Item } from "../components/Item"
import { RoundedBox } from "../components/RoundedBox"
import { useWalletClassification } from "../hooks/useWalletClassification"
import { Link as MuiLink, styled,Box, Typography } from "@mui/material"
import Link from "next/link"
import WalletIcon from "@mui/icons-material/AccountBalanceWallet"
import FaucetIcon from "@mui/icons-material/Opacity"
import ClaimIcon from "@mui/icons-material/GetApp"
import { NavBar } from "../components/NavBar"

type Action =
  | {
      type: "success"
      txHash: string
    }
  | {
      type: "default"
    }
  | {
      type: "error"
      error: string
    }

type State =
  | {
      status: "success"
      txHash: string
    }
  | {
      status: "default"
    }
  | {
      status: "error"
      error: string
    }

const initialState: State = {
  status: "default"
}

const reducer = (_: State, action: Action): State => {
  switch (action.type) {
    case "error":
      return { status: "error", error: action.error }
    case "success":
      return { status: "success", txHash: action.txHash }
    default:
      return { status: "default" }
  }
}
const faucet = process.env.NEXT_PUBLIC_WALLET_ADDRESS as string

const Home: NextPage = () => {
  const { account } = useEthers()
  const [state, dispatch] = useReducer(reducer, initialState)
  const balance = useEtherBalance(account, { refresh: "everyBlock" })
  const faucetBalance = useEtherBalance(faucet, { refresh: "everyBlock" })

  const [retrieveAmount] = useWalletClassification()

  const handleSuccess = (txHash: string) => dispatch({ type: "success", txHash })

  const handleError = (error: string) => dispatch({ type: "error", error })

  const renderAlert = useCallback(() => {
    switch (state.status) {
      case "success":
        return (
          <Alert severity="success">
            Sepolia ETH has been dispatched to your wallet. <br />
            You should receive it within 1-3 minutes.
            <br />
            TxHash:
            <br />{" "}
            <Link href={`https://sepolia.etherscan.io/tx/${state.txHash}`} passHref>
              <MuiLink target="_blank" rel="noopener referrer">
                {state.txHash}
              </MuiLink>
            </Link>
          </Alert>
        )
      case "error":
        return <Alert severity="error">{state.error}</Alert>
      default:
        return null
    }
  }, [state])

  return (
    <div>
      <NavBar></NavBar>
      <Box px={2} py={1} marginTop={7} marginBottom={7}>
      <Typography variant="h2" align="center" color="white" sx={{ fontWeight: 'bold' }}>
  Sepolia Faucet
</Typography>
<Typography variant="h5" align="center" color="white" sx={{ fontWeight: 'bold' }}>
  Fast and Reliable Source of Sepolia 0.1 ETH/day
</Typography>

      </Box>
      
      <RoundedBox>
        <Item>
          <WalletIcon />

          <span> Your wallet balance</span>
          <span>{balance ? formatEther(balance) : <>&ndash;</>} ETH</span>
        </Item>
        <Item>
          <FaucetIcon />
          <span> Faucet balance</span>
          <span>{faucetBalance ? formatEther(faucetBalance) : <>&ndash;</>} ETH</span>
        </Item>
        <Item>
          <ClaimIcon /> <span> Claimable Sepolia ETH</span>
          <span>{formatEther(retrieveAmount(account))} ETH</span>
        </Item>
        <ClaimButton onSuccess={handleSuccess} onError={handleError} />
        {renderAlert()}
      </RoundedBox>


      

    </div>
  )
}

export default Home
