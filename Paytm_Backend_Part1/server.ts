import app from "./src/app";
import { config } from "./src/config";

const startServer = async () => {
  const port = config.PORT;
  try {
    app.listen(port, () => {
      console.log(`Server is Runing on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
