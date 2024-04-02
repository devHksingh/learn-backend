import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY, 
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null
        // upload file on cloudinary
        const response=  await cloudinary.uploader.upload.apply(localFilePath,{
            resource_type: 'auto'
        })
        // flie has been uploaded successfull
        console.log('file is uploaded on cloudinary');
        console.log(response);
        console.log(response.url);
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove temp file as the upload operation got failed

        return null
        
    }
}

export {uploadOnCloudinary}