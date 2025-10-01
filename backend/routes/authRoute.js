import express from "express"

import {signUpUser, loginUser, signOutUser, verifyEmail, resetPassword, forgetPassword, checkAuth} from "../controllers/authController.js"
import {verifyJwtToken} from "../middleware/verifyJwtToken.js"

const authRouter = express.Router()

authRouter.post("/signup", signUpUser)

authRouter.post("/verify-email", verifyEmail)

authRouter.post("/login", loginUser)
authRouter.post("/signout", signOutUser)

authRouter.post("/forget-password", forgetPassword)
authRouter.post("/reset-password/:token", resetPassword)

authRouter.get("/check-auth", verifyJwtToken, checkAuth)

export default authRouter;