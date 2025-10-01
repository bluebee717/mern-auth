import { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth()

  useEffect(()=>{
    if(auth.user) navigate("/secret")
  }, [auth.user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required", {
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
      await auth.forgetPassword(email)
      toast.success("Password reset link sent to your email", {
        duration: 2500,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      navigate("/login")
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
    } finally {
      setLoading(false);
    }
    
    setEmail("");
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-80">
      <h2 className="text-2xl mb-4">Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-2 border border-gray-300 rounded mb-4"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button
          className="w-full flex items-center justify-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          type="submit"
        >
          {loading ? <LoaderIcon /> : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
