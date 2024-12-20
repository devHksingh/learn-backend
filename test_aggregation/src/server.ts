import express, { Request, Response } from 'express'
import { Config } from './config'
import logger from './config/logger'
import app from './app'


const port = Config.PORT || 3000



app.listen(port,()=>{
    logger.info(`Server is listening at port: ${port}`);
})
