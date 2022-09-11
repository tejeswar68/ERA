import express from 'express';
import {  getAllBlog ,addBlog, updateBlog, deleteBlog, getBlogById, getByUserId} from '../controllers/blogController.js';
const blogRouter = express.Router();

blogRouter.get("/",getAllBlog);
blogRouter.post("/add",addBlog);
blogRouter.put('/update/:id',updateBlog);
blogRouter.get('/:id',getBlogById);
blogRouter.delete('/:id',deleteBlog);
blogRouter.get("/user/:id",getByUserId)

export default blogRouter;