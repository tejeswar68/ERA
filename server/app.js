import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

mongoose.connect('mongodb+srv://hello1:hello1@tejeswar68.pgoqr.mongodb.net/era?retryWrites=true&w=majority')
    .then(() => app.listen(5005))
    .then(() => console.log("Connected to database and server listening on port 5005"))
    .catch((err) => console.log(err))

