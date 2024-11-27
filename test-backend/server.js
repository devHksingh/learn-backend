import express from "express"
import "dotenv/config" 

const app = express()

const PORT = process.env.PORT || 8000

app.get('/',(req,res)=>{
    return res.json({message:"Welcome to home page"})
})

app.listen(PORT,()=>console.log(`server is running on PORT ${PORT}`))