import express  from "express";

const app = express()

// Routes
// app.use()

app.get('/',(req,res,next)=>{
    res.json({
        message:'Wellcome to dummy server api '
    })
})


export default app