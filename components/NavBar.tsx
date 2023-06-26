import { Box, Typography, Button } from "@mui/material"
import Image from 'next/image'
import Logo from './Caliber_Solid.png'

export const NavBar = () => {
  return (
    <Box 
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={2}
      bgcolor="white"
      color="inherit"
      height={40} 
    >
      <Box display="flex" alignItems="center">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: "0.8rem", marginRight: 1 }}>
          Powered by
        </Typography>
        <Image src={Logo} alt="Logo" size="small" /> 
      </Box>
      <Button variant="outlined" color="inherit" size="small">Twitter Login</Button>
    </Box>
  )
}
