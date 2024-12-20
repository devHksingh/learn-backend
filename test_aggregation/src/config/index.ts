import { config } from 'dotenv'


config()

const {
    PORT,
    NODE_ENV,
    DB_URL,
    CLIENT_URL,
} = process.env

export const Config = {
    PORT,
    NODE_ENV,
    DB_URL,
    CLIENT_URL
}