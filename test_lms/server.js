import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
config();

const app = express();
const PORT = process.env.PORT;

// logging middleware 
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// API Routes

// Global Error handler
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(err.status || 500).json({
        status:'error',
        message:err.message|| 'Interval server error',
        ...(process.env.NODE_ENV ==='development' && {stack:err.stack})
    })
})

// body parser middelware
app.use(express.json({limit:'10kb'}))
app.use(express.urlencoded({extended:true,limit:"10kb"}))

// it should be always at bottom
// 404 handeler

app.use((req,res)=>{
    res.status(404).json({
        status:"error",
        message:"Route not found"
    })
})

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} in ${process.env.NODE_ENV}`);
});