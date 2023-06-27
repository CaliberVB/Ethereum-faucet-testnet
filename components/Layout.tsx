import { styled } from "@mui/material"

export const Layout = styled("div")(() => ({
  background: '#0061e2'
  // `
  //   radial-gradient(circle at 10% 20%, rgba(0, 97, 226, 0.7), transparent 50%),
  //   radial-gradient(circle at 50% 50%, rgba(0, 97, 226, 0.6), transparent 50%),
  //   radial-gradient(circle at 90% 80%, rgba(0, 97, 226, 0.7), transparent 50%),
  //   radial-gradient(circle at 40% 80%, rgba(0, 97, 226, 0.6), transparent 50%),
  //   radial-gradient(circle at 80% 20%, rgba(0, 97, 226, 0.7), transparent 50%),
  //   linear-gradient(to right, rgba(0, 97, 226, 0.2), rgba(0, 97, 226, 0.2))
  // `
  ,
  backgroundBlendMode: 'screen',
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column"
}))
