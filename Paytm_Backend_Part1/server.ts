import app from "./src/app";
import { Config } from "./src/config";
import connectDB from "./src/config/db";

const startServer = async () => {
  const port = Config.port;
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`Server is Runing on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
