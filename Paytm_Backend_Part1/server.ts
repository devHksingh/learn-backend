import app from "./src/app";

const startServer = async () => {
  const port = 4000;
  try {
    app.listen(port, () => {
      console.log(`Server is Runing on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
