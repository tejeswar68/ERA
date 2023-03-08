import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getAllBlog = async(req,res,next)=>
{
    let blogs;
    try {
        blogs = await Blog.find().populate("user");
        if(!blogs)
        {
            return res.status(404).json({message:'No Blogs Found'})
        }
        return res.status(200).json({blogs});
    } catch (error) {
        console.log(error);
    }
}

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
  
    let existingUser;
    try {
      existingUser = await User.findById(user);
    } catch (err) {
      return console.log(err);
    }
    if (!existingUser) {
      return res.status(400).json({ message: "Unable To Find User By This ID" });
    }
    const blog = new Blog({
      title,
      description,
      image,
      user,
    });
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await blog.save({ session });
      existingUser.blogs.push(blog);
      await existingUser.save({ session });
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  
    return res.status(200).json({ blog });
  };
export const updateBlog = async(req,res,next)=>
{
    const {title,description,user} = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(blogId);
    } catch (error) {
        return console.log(error);
    }
    if(blog.user!==user)
    return res.status(500).json({message:"Unable to update the blog huhahahaa"})
    try {
         blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            description
        })
    } catch (error) {
     return console.log(error)   
    }
    if(!blog)
    {
        return res.status(500).json({message:"Unable to update the blog"})
    }
    return res.status(200).json({blog});
  
}

export const getBlogById = async(req,res,next)=>
{
    const id = req.params.id;

    let blog;
    

    try {
        blog = await Blog.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if(!blog)
    {
        return res.status(404),json({message:"NO BLOG FOUND!"});
    }
    return res.status(200).json({blog});
}

export const deleteBlog = async(req,res,next) =>
{
    const id = req.params.id;
    const {userid} = req.body;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if(blog.user!==userid)
    return res.status(500).json({message:"Unable to delete the blog huhahahaa"})
    try {
        blog = await Blog.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (error) {
        console.log(error);
    }
    if(!blog)
    {
        return res.status(500).json({message:"Unable to delete!"})
    }
    return res.status(200).json({message:"Blog Deleted Successfully!"})
}

export const getByUserId = async(req,res,next) =>
{
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (error) {
        return console.log(error);
    }
    if(!userBlogs)
    {
        return res.status(400).json({message:"No blogs found"})
    }
    return res.status(200).json({user:userBlogs})
}