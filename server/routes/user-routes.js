import express from 'express';
import { getAllUser, signUp,login } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get("/",getAllUser);
userRouter.post("/signup",signUp);
userRouter.post("/login",login);

export default userRouter;