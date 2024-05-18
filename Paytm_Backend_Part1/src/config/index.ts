import {config as conf} from 'dotenv'

conf()

// const {PORT} = process.env ||3000
const config_var = {
    port : process.env.PORT,
    databaseUrl:process.env.MONGODB_URL,
    env:process.env.NODE_ENV
}

export const Config = Object.freeze(config_var)
// export const config = Object.freeze(_config)