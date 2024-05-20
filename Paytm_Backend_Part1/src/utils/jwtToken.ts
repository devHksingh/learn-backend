import { sign } from "jsonwebtoken"
import { Config } from "../config"



const genrateJWTToken = (payload:{})=>{
    const token = `Bearer ${sign(payload,Config.jwtSecret as string,{expiresIn:Config.jwtTokenExpiry,algorithm:"HS256"})}`
    return token
}

export default genrateJWTToken