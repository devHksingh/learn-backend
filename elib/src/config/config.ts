import { config as conf } from "dotenv"

conf()

const _config = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.MONGODB_URL,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    cloudinaryCloud:process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey:process.env.CLOUDINARY_CLOUD_API_KEY,
    cloudinaryApiSecret:process.env.CLOUDINARY_CLOUD_API_SECRET,
    frontendDomain:process.env.FORNTEND_DOMAIN,

}

export const config  = Object.freeze(_config) //read only