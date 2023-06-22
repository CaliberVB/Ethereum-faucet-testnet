import { AppBar, Toolbar, Typography } from "@mui/material"

export const NavBar = () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {/* Add your logo component or text here */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sepolia ETH Faucet{" "}
        </Typography>
        {/* Add other navigation elements like links or buttons here */}
      </Toolbar>
    </AppBar>
  )
}
