import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcryptjs'

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

export const User = mongoose.model('User',userSchema)


userSchema.pre('save',async function (next) {
    if(!(this.isModified('password'))){
        return next()
    } 
    this.password = await bcrypt.hash(this.password,10) 
    return next() 
})