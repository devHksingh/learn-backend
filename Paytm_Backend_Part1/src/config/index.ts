import {config as conf} from 'dotenv'

conf()

const {PORT} = process.env ||3000

export const config = {PORT}
// export const config = Object.freeze(_config)