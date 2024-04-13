import { NextFunction, Request, Response } from "express";
import fs from 'node:fs';
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";
import bookModel from "./bookModel";


const createBook = async (req:Request,res:Response,next:NextFunction)=>{
    
    const {title,genre} = req.body
    console.log("files",req.files);

    const files = req.files as { [filename:string]:Express.Multer.File[]}

    const coverIamgeMimeType = files.coverImage[0].mimetype.split('/').at(-1)
    const filename = files.coverImage[0].filename
    const filePath = path.resolve(__dirname,'../../public/data/uploads',filename)

    const bookFileName = files.file[0].filename
    const bookFilePath = path.resolve(__dirname,'../../public/data/uploads',bookFileName)
    
    try {
        const uploadResult = await cloudinary.uploader.upload(filePath,{
            filename_override:filename,
            folder:'book-cover',
            format:coverIamgeMimeType
        })
    
        
        
        
        const bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath,{
            resource_type:"raw",
            filename_override:bookFileName,
            folder:'book-pdf',
            format:"pdf"
    
        })
        
    
    
        console.log(uploadResult);
        console.log("book",bookFileUploadResult);

        const newBook = await bookModel.create({
            title,
            genre,
            author:"66181b915286b4e7d36c04a7",
            coverImage:uploadResult.secure_url,
            file:bookFileUploadResult.secure_url
        })

        // Delete temp files

        try {
            await fs.promises.unlink(filePath)
            await fs.promises.unlink(bookFilePath)
        } catch (error) {
            console.log(error);
            
        }
        
        res
        .status(201)
        .json({
            id:newBook._id
        })

        
    } catch (error) {
        console.log(error);
        return next(createHttpError(500,"Error while uploading the files."))
        
    }
    
    


}

export { 
    createBook
 }