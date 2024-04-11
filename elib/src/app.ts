// express setup 

import express, { NextFunction, Request, Response } from 'express'

import globalErrorHandler from './middlewares/globalErrorHanlder'
import userRouter from './user/userRouter'

const app = express()

// Returns middleware that only parses json and only looks at requests
app.use(express.json())

// Routes

app.get('/',(req,res,next)=>{
    
    // const error = createHttpError(400,"Something went wrong")
    // throw error
    res.json({message:"Welcome to elib"})
})

// user router

app.use('/api/users',userRouter)


//  Global error handler
app.use(globalErrorHandler)




export default app