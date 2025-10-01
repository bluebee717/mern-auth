import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const VerifyEmailWithCode = () => {
  const [verificationCode, setVerificationCode] = useState("");

  const auth = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      console.log("User in VerifyEmailWithCode:", auth.user);
      navigate("/secret");
    }

  }, [auth.user, navigate])
  

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    console.log(verificationCode)
    // Handle email verification logic here
    try {
      await auth.verifyEmail(verificationCode)
      toast.success("Email verified successfully!", {
        duration: 2500,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      navigate("/secret");
    } catch (error) {
      console.error("Email verification failed:", error);
      toast.error(error.response?.data?.message || error.message, {
        duration: 2500,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  }
  return (
    <div className="bg-white p-6 rounded shadow-md w-80">
      {/* Add your email verification form here */}
      <form onSubmit={handleVerifyEmail}> 
        <h2 className="text-2xl mb-4">Verify Email</h2>
        <input
          className="w-full p-2 border border-gray-300 rounded mb-4"
          type="text"
          minLength={6}
          maxLength={6}
          placeholder="Enter verification code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
        <button
          className="w-full flex items-center justify-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default VerifyEmailWithCode;
