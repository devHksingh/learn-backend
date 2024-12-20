import cookieParser from 'cookie-parser'
import express, { Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import cors from 'cors'
import { Config } from './config'
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'

const app = express()
// CORS configuration
app.use(cors({
    origin: Config.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
        "Authorization"
    ]
}))

// rate limiter

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: "Too many request from this IP ,please try later"
})

// security middleware
app.use(helmet())
app.use('/api', limiter)
app.use(mongoSanitize())
app.use(hpp())

// body parser middelware
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())




app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Server is running and heathy"
    })
})

// Api route

// Global Error Handeler


export default app