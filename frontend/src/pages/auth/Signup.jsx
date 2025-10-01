import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast, { LoaderIcon, ErrorIcon } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const auth = useAuth();

// inside component
useEffect(() => {
  if (auth.user) navigate("/secret");
}, [auth.user, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
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
      await auth.signup(username, email, password);
      toast.success("Signup successful!", {
        duration: 2500,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      setLoading(false);
      navigate("/verify-email");
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
    setUsername("");
    setEmail("");
    setPassword("");
    setError(null);
  };
  return (
    <div className="bg-white p-6 rounded shadow-md w-80">
      <form onSubmit={handleSignup}>
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            id="username"
            name="username"
          />
        </div>
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
          {loading ? <LoaderIcon /> : "Sign Up"}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default Signup;
