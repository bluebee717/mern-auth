import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

const Secret = () => {
  const auth = useAuth();
  const handleLogout = async () => {
    try {
      await auth.logout();
      toast.success("Logged out successfully", {
        duration: 2500,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error.response?.data?.message || error.message, {
        duration: 2500,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
  return (
    <div>
      <pre className="max-w-xl text-wrap">{JSON.stringify(auth.user, null, 2)}</pre>
      <button
        className="p-5 rounded-md bg-purple-300 text-gray-100 hover:bg-purple-500"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Secret;
