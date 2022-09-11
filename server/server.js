import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(process.env.PORT))
    .then(() => console.log(`Connected to database and server listening on port ${process.env.PORT}`))
    .catch((err) => console.log(err))

