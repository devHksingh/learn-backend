import express from "express";
import { createBook } from "./bookController";
import multer from "multer";
import path from "node:path";


const bookRouter = express.Router()


// routes

const upload = multer({
    dest:path.resolve(__dirname,'../../public/data/uploads'),
    limits:{fileSize:3e7}
})

// /api/books
bookRouter.post('/',upload.fields([
    {name:'cover' , maxCount:1},
    {name:'file',maxCount:1},
]),createBook)


export default bookRouter