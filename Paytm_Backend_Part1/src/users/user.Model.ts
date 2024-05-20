import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import { Config } from "../config";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
},{timestamps:true})


userSchema.pre('save',async function (next) {
    if(!(this.isModified('password'))){
        return next()
    } 
    this.password = await bcrypt.hash(this.password,10) 
    return next() 
})

userSchema.methods.isPasswordCorrect = async function(password:string){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.genrateJWTToken = function(){
    return jwt.sign({
        id:this._id
    },Config.jwtSecret as string,{expiresIn:Config.jwtTokenExpiry})
}
export const User = mongoose.model('User',userSchema)