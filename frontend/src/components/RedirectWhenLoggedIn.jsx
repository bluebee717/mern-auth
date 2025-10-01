import { useAuth } from "../hooks/useAuth"

const RedirectWhenLoggedIn = ({children}) => {
    const auth = useAuth()
  return (
    <div>RedirectWhenLoggedIn</div>
  )
}

export default RedirectWhenLoggedIn