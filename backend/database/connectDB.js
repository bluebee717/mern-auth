import mongoose from "mongoose"
import { envConfig } from "../config/envConfig.js"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(envConfig.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }catch (error) {
        console.log(error.message)
        process.exit()
    }
}