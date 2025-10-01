import { Outlet } from "react-router"


const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tl from-blue-300 to-rose-500">
        <Outlet />
    </div>
  )
}

export default AuthLayout