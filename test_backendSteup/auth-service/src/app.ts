import express, { Request, Response, NextFunction } from "express"
import logger from "./config/logger";
import  { HttpError } from "http-errors";

const app = express()

app.use(express.json())

// app.get('/', (req: Request, res: Response) => {
//     res.sendStatus(200).json({ message: 'Welcome to home page' })
// })
app.get('/', (req: Request, res: Response) => {
    // const err = createHttpError(401, "this route is not public")
    // next(err)
    res.status(200).json({ message: 'Welcome to home page' });
});

// global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message)
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                msg: err.message,
                path: '',
                location: ''
            }
        ]
    })
})


export default app