import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
config();
import helmet from "helmet";
import mongoSanitize from 'express-mongo-sanitize'
import hpp from "hpp";
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();
const PORT = process.env.PORT;

// handeling global rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "Too many request from this IP ,please try later",
});
// security middleware
app.use(helmet());
app.use("/api", limiter);
app.use(mongoSanitize());
app.use(hpp())



// logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}



// body parser middelware
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// cookieParser
app.use(cookieParser())

// CORS configuration
app.use(cors({
    origin:process.env.CLIENT_URL || "http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","DELETE","PATCH","HEAD","OPTIONS"],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Access-Control-Allow-Origin",
        "Origin",
        "device-remember-token"
    ]
}))


// API Routes




// it should be always at bottom
// 404 handeler

app.use((req, res) => {
    res.status(404).json({
      status: "error",
      message: "Route not found",
    });
  });

// Global Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      status: "error",
      message: err.message || "Interval server error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} in ${process.env.NODE_ENV}`);
});
