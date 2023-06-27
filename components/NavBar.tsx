import { Box, Typography, Button } from "@mui/material"
import Image from 'next/image'
import { signIn } from "next-auth/react"

  

export const NavBar = () => {
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    signIn("twitter")
  }
  return (
    <Box 
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={2}
      bgcolor="rgba(202, 236, 220, 0.6)" // semi-transparent background      color="inherit"
      height={40}
    >
      <Box display="flex" alignItems="center">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: "0.85rem", marginRight: 1, color:'white' }}>
          Powered by
        </Typography>
        <Box width={90} height={20}>
          <img src='./Caliber_White.png' alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />     
        </Box>
      </Box>
      <Button 
        onClick={handleLogin}
        variant="outlined" 
        sx={{ 
          color: 'white',
          borderColor: 'white',
          '&:hover': {
            color: 'black',
            backgroundColor: 'white',
          }
        }}
        size="small"
      >
        Twitter Login
      </Button>
    </Box>
  )
}
