import {useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const { token } = useParams()
    // toast(token)

    const auth = useAuth()
    const navigate = useNavigate();

    useEffect(()=>{
      if(auth.user) navigate("/secret")
    },[auth.user, navigate])

    const handleResetPassword = async (e) => {
      // check for valid token.
        e.preventDefault();
        // Add your reset password logic here
        console.log({newPassword, confirmNewPassword});
        if(newPassword !== confirmNewPassword){
          return toast.error("password and confirm password do not match")
        }
         try {
          await auth.resetPassword(token, newPassword)
          toast.success("Password reset successful. Please login with your new password.",{
            duration: 4000, 
            position: "top-center",
            style: {
              background: "#333",
              color: "#fff",
            },
          })
          navigate("/login")
         } catch (error) {
           toast.error("Failed to reset password.",{
            duration: 2000,
            position: "top-center"
           })
           throw error
         }
        setNewPassword("");
        setConfirmNewPassword("");
    }

  return (
    <div className='bg-white p-6 rounded shadow-md w-80'>
        <form onSubmit={handleResetPassword}>
            <h2 className='text-2xl mb-4'>Reset Password</h2>
            <input className='w-full p-2 border border-gray-300 rounded mb-4' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="text" placeholder='Enter your new password' />
            <input className='w-full p-2 border border-gray-300 rounded mb-4' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} type="text" placeholder='Confirm your new password' />
            <button className='w-full flex items-center justify-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600' type="submit">Reset Password</button>
        </form>
    </div>
  )
}

export default ResetPassword