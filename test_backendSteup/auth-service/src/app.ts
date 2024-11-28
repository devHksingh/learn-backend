import express, { Request, Response } from "express"

const app = express()

app.use(express.json())

// app.get('/', (req: Request, res: Response) => {
//     res.sendStatus(200).json({ message: 'Welcome to home page' })
// })
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Welcome to home page' });
});

export default app