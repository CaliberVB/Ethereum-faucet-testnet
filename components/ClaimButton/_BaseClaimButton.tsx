import { Button } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { Sepolia, useEthers } from "@usedapp/core"
import { isNil } from "lodash"
import Link from "next/link"
import { hasMetamask } from "../../hooks/hasMetamask"
import { claimTokens, retrieveNonce } from "../../services/HttpClient"
import { messageTemplate } from "../../utils/textMessage"
import { ethers } from "ethers"

type BaseClaimButtonProps = {
  onSuccess: (message: string) => void
  onError: (message: string) => void
  retrieveCaptcha: () => Promise<string>
}

export const BaseClaimButton = ({ onSuccess, onError, retrieveCaptcha }: BaseClaimButtonProps) => {
  const { account, library, isLoading: loading, activateBrowserWallet, switchNetwork, chainId } = useEthers()
  const installed = hasMetamask()

  const claimSepoliaEth = async () => {
    try {
      if (isNil(library) || isNil(account)) {
        throw new Error("Wallet is not connected")
      }

      const captchaToken = await retrieveCaptcha()

      const nonce = await retrieveNonce()
      const message = messageTemplate(nonce)

      const signer = (library as ethers.providers.JsonRpcProvider).getSigner()
      const signature = await signer.signMessage(message)

      const txHash = await claimTokens(account as string, message, signature, captchaToken)
      console.log(txHash.message)
      onSuccess(txHash.message)
    } catch (e: any) {
      if (e.name === "AxiosError" && e.response.data.message) {
        onError(e.response.data.message)
        return
      }

      onError(e?.message || "Something went wrong")
    }
  }

  if (!installed) {
    return (
      <Link href="https://metamask.io/download/" passHref>
        <Button variant="contained" fullWidth>
          Install MetaMask
        </Button>
      </Link>
    )
  }

  if (loading) {
    return <LoadingButton variant="contained" loading fullWidth />
  }

  if (!account) {
    return (
      <Button variant="contained" onClick={() => activateBrowserWallet()} fullWidth style={{
        display: "inline-flex",
        alignItems: "center",
        margin:"2px",
        padding: "3px", // reduced padding
        paddingLeft: "10px", // reduced padding
        backgroundColor: "lightblue", // lighter background color
        color: "white",
        borderRadius: "8px",
        textDecoration: "none"
      }}>
        Connect wallet
      </Button>
    )
  }

  if (chainId !== Sepolia.chainId) {
    return (
      <Button variant="contained" onClick={() => switchNetwork(Sepolia.chainId)} fullWidth style={{
        display: "inline-flex",
        alignItems: "center",
        margin:"2px",
        padding: "3px", // reduced padding
        paddingLeft: "10px", // reduced padding
        backgroundColor: "lightblue", // lighter background color
        color: "white",
        borderRadius: "8px",
        textDecoration: "none"
      }}>
        Switch to Sepolia network
      </Button>
    )
  }

  return (
    <Button variant="contained" onClick={claimSepoliaEth} fullWidth style={{
      display: "inline-flex",
      alignItems: "center",
      margin:"2px",
      padding: "3px", // reduced padding
      paddingLeft: "10px", // reduced padding
      backgroundColor: "lightblue", // lighter background color
      color: "white",
      borderRadius: "8px",
      textDecoration: "none"
    }}>
      Claim Sepolia ETH
    </Button>
  )
}
