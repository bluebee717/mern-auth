import "dotenv/config"

export const envConfig = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    NODE_ENV: process.env.NODE_ENV,
FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,

    MAILTRAP_TOKEN: process.env.MAILTRAP_TOKEN,
}