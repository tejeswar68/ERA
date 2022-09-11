import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
const app = express();

mongoose.connect(process.env.CONNECTION_URL)
.then(() => console.log(`Connected to database`))
.catch((err) => console.log(err))

app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

//Serve Static assets if in production
if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}


const PORT = process.env.PORT||5005;
    app.listen(PORT,()=>console.log(`server listening on port ${PORT}`));
