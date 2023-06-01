import { Link as MuiLink } from "@mui/material"
import Link from "next/link"
import { RoundedBox } from "./RoundedBox"

export const OpenSourceMemo = () => (
  <div>
    <RoundedBox>
      <b>Daily limit for each IP address/ wallet: 0.002ETH</b>
    </RoundedBox>
    <RoundedBox>
      <b>If you have plenty of ETH, consider donate back to us at</b>
    </RoundedBox>
  </div>
)
