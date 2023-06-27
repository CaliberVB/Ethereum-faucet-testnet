import { signIn } from "next-auth/react"
import { Button } from "@mui/material"


const TwitterLoginButton = () => {
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    signIn("twitter")
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", paddingTop: "10px" }}
    >
      <Button
        onClick={handleLogin}
        style={{
          display: "inline-flex",
          alignItems: "center",
          margin:"2px",
          padding: "3px", // reduced padding
          paddingLeft: "10px", // reduced padding
          backgroundColor: "#0061e2", // lighter background color
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight:'bold'
        }}
        fullWidth
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#39a1f2")} // adjusted hover color
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4AB3F4")} // reset to initial color
      >
        <span>Login with Twitter</span>
        <img src={"/twitter.svg"} alt="Twitter Logo" style={{ marginLeft: "8px", marginRight: "3px", width: '20px', height: '20px' }} /> {/* reduced size of the logo */}
      </Button>
    </div>
  )
}

export default TwitterLoginButton
