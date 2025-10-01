import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router";

const Home = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    console.log("Auth state on Home page:", auth);
  }, [auth.user]);
  return (
    <div className="text-blue-500 p-6">
      <button className="border p-2 rounded hover:bg-blue-500 hover:text-white" onClick={() => navigate("/login")}>Login</button>
      <button className="border p-2 rounded hover:bg-blue-500 hover:text-white" onClick={() => navigate("/signup")}>Signup</button>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </div>
  )
}

export default Home