import app from "./app";
import { Config } from "./config";



const startServer =()=>{
  const port = Config.PORT || 5555

  try {
    app.listen(port,()=>console.log(`Sever is running on port ${port}`))
    
  } catch (err) {
    console.log('Error is occured while starting the server : ',err)
    process.exit(1)
  }
}

startServer()