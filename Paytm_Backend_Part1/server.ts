import app from "./src/app";
import { Config } from "./src/config";

const startServer = async () => {
  const port = Config.port;
  try {
    app.listen(port, () => {
      console.log(`Server is Runing on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
