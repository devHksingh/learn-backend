import express from "express";
import userRoute from "./users/user.route";

const app = express();

// app.get("/", (req, res) => {
//   res.status(200).send("Working fine");
// });

app.use(express.json())

// user route

app.use('/api/v1/users',userRoute)


export default app;
