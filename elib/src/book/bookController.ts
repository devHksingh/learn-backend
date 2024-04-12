import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";


const createBook = async (req:Request,res:Response,next:NextFunction)=>{
    
    // const {} = req.body
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
        
    } catch (error) {
        console.log(error);
        return next(createHttpError(500,"Error while uploading the files."))
        
    }
    
    res.json({})


}

export { 
    createBook
 }