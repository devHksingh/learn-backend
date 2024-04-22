import { config as conf } from "dotenv"

conf()
const _config ={
    port : process.env.PORT,
    dbUrl: process.env.MONGO_CONNECTION_STRING,
    env:process.env.NODE_ENV,
    jwtSecret:process.env.JWT_SECRET,
    frontendDomain:process.env.FORNTEND_DOMAIN,
}

export const config = Object.freeze(_config)