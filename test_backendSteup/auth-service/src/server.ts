import app from "./app";
import { Config } from "./config";
import logger from "./config/logger";



const startServer = () => {
  const port = Config.PORT || 5555

  try {
    app.listen(port, () => {
      
      logger.info("sERVER IS Listening on port ", { port: port })
    })

  } catch (err) {
    console.log('Error is occured while starting the server : ', err)
    process.exit(1)
  }
}

startServer()