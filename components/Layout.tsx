import { styled } from "@mui/material"

export const Layout = styled("div")(() => ({
  background: `
    radial-gradient(circle at 10% 20%, rgba(160, 230, 199, 0.7), transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(90, 190, 220, 0.6), transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(140, 210, 190, 0.7), transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(160, 190, 220, 0.6), transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(140, 210, 240, 0.7), transparent 50%),
    linear-gradient(to right, rgba(90, 170, 210, 0.2), rgba(140, 210, 190, 0.2))
  `,
  backgroundBlendMode: 'screen',
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column"
}))
