
import User from "../model/User.js";
import bcrypt from 'bcryptjs';
export const getAllUser = async(req,res,next)=>
{
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }
    if(!users)
    {
        return res.status(404).json({message:"No users found"});
    }
    return res.status(200).json({users});
}
export const getAllUserId = async(req,res,next)=>
{
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }
    if(!users)
    {
        return res.status(404).json({message:"No users found"});
    }
    let userIds=[];
    users.map((user)=>userIds.push(user._id))
    return res.status(200).json({userIds});
}


export const signUp = async(req,res,next)=>
{
    const {name,email,password} = req.body;
    console.log(req);

    let existingUser ;

    try {
        existingUser = await User.findOne({email});
        
    } catch (error) {
        console.log(error);
        
    }
    if(existingUser)
    {
        res.status(400).json({message:"User Already Exits!"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name ,
        email ,
        password:hashedPassword ,
        blogs:[]
    });
    
    try {
       await user.save();
    } catch (error) {
        return console.log(error);
        
    }
    return res.status(201).json({user});
}

export const login = async(req,res,next)=>
{
    const {email,password} = req.body;
    let existingUser;

    try
    {
        existingUser = await User.findOne({email});
    }
    catch(err)
    {
        return console.log(err);
    }
    if(!existingUser)
    {
        return res.status(404).json({message:"User Doesn't exists"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect)
    {
        return res.status(404).json({message:"Incorrectpassword"});
    }
    return res.status(200).json({message:"Login Successfull",user:existingUser});
}