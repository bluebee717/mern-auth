import jwt from "jsonwebtoken"
import { envConfig } from "../config/envConfig.js"



export const verifyJwtToken = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    const decodedToken = jwt.verify(token, envConfig.JWT_SECRET)
    req.userId = decodedToken.userId
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    })
  }
}