import express from "express";
import userRoute from "./users/user.route";
import globalErrorHandler from "./middlewares/globalErrorHanlder";

const app = express();

// app.get("/", (req, res) => {
//   res.status(200).send("Working fine");
// });

app.use(express.json())

// user route

app.use('/api/v1/users',userRoute)


//  Global error handler
app.use(globalErrorHandler)

export default app;
