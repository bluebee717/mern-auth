import jwt from "jsonwebtoken"
import { envConfig } from "../config/envConfig.js"

export const generatedJWTandSetCookie = (userId, res) => {
    const token = jwt.sign(
        {userId},
        envConfig.JWT_SECRET,
        {expiresIn: envConfig.JWT_EXPIRE}
    )
    res.cookie("token", token, {
        httpOnly: true,
        secure: envConfig.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 5 days
    })
    return token
}