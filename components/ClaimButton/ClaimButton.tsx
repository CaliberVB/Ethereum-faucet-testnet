import { useSession } from "next-auth/react"
import { BaseClaimButton } from "./_BaseClaimButton"
import { GoogleReCaptchaClaimButton } from "./_GoogleReCaptchaClaimButton"
import TwitterLoginButton from "../TwitterLoginButton"
import Spinner from "../Spinner"

type ClaimButtonProps = {
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

const ClaimButtonComponent = (props: ClaimButtonProps) => {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Spinner /> // You can replace this with a loading spinner or similar
  }

  // if (status === "unauthenticated") {
  //   return <TwitterLoginButton /> // Or a sign-in prompt
  // }

  switch (process.env.NEXT_PUBLIC_ENABLE_CAPTCHA) {
    case "recaptcha_v3": {
      return <GoogleReCaptchaClaimButton {...props} />
    }
    default: {
      const retrieveCaptcha = async (): Promise<string> => {
        return new Promise((resolve) => resolve(""))
      }

      return <BaseClaimButton {...props} retrieveCaptcha={retrieveCaptcha} />
    }
  }
}

export const ClaimButton = ClaimButtonComponent
