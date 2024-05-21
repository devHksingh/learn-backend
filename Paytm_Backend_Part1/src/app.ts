import express from "express";
import userRoute from "./users/user.route";
import globalErrorHandler from "./middlewares/globalErrorHanlder";
import cors from "cors";
import { Config } from "./config";

const app = express();

app.use(
  cors({
    origin: Config.forntendDomain,
  }),
);
app.use(express.json());

// user route

app.use("/api/v1/users", userRoute);

//  Global error handler
app.use(globalErrorHandler);

export default app;
