import { sign } from "jsonwebtoken"
import { Config } from "../config"



const genrateJWTToken = (payload:{})=>{
    const token = `Bearer ${sign(payload,Config.jwtSecret as string,{expiresIn:'2D',algorithm:"HS256"})}`
    return token
}

export default genrateJWTToken