import { signIn } from "next-auth/react"

const TwitterLoginButton = () => {
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    signIn("twitter")
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", paddingTop: "10px" }}
    >
      <button
        onClick={handleLogin}
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "5px",
          paddingTop: "5px",
          paddingLeft: "13px",
          backgroundColor: "#1DA1F2",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none"
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0d95e8")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1DA1F2")}
      >
        <span>Login with Twitter</span>
        <img src={"/twitter.svg"} alt="Twitter Logo" style={{ marginLeft: "8px", marginRight: "3px" }} />
      </button>
    </div>
  )
}

export default TwitterLoginButton
