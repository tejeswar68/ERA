import express from 'express';
import { getAllUser,getAllUserId, signUp,login } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get("/",getAllUser);
userRouter.get("/id",getAllUserId);
userRouter.post("/signup",signUp);
userRouter.post("/login",login);

export default userRouter;