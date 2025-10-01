import { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate()

  // inside component
useEffect(() => {
  if (auth.user) navigate("/secret");
}, [auth.user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();


    if (!email || !password) {
      setError("All fields are required");
      toast.error(error, {
        duration: 2500,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    setLoading(true);
    try {
      await auth.login(email, password);
      toast.success("Login successful!", {
        duration: 2500,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      console.log("Login successful");
      setLoading(false);
      navigate("/secret")
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message, {
        duration: 2500,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      setLoading(false);
    }

    setEmail("");
    setPassword("");
    setError(null);
  };
  return (
    <div className="bg-white p-6 rounded shadow-md w-80 ">
      <form onSubmit={handleLogin}>
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full p-2 border border-gray-300 rounded"
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>

        <button
          className="w-full flex items-center justify-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          type="submit"
        >
          {loading ? <LoaderIcon /> : "Login"}
        </button>
      </form>
      <div>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
        <p className="mt-4 text-center text-sm">
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
