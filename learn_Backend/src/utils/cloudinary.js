import {v2 as cloudinary} from "cloudinary"

import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: parseInt(process.env.
    CLOUDINARY_CLOUD_API_KEY), 
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET, 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        

        if (!localFilePath) return null
        //upload the file on cloudinary
        console.log(localFilePath)
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        console.log(error.message)
        return null;
    }
}



export {uploadOnCloudinary}