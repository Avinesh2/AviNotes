import {errorHandler} from "../utils/error.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;
    const isValidUser=await User.findOne({email:email})
    if(isValidUser){
        return next(errorHandler(400,"User already Exist"))
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser=new User({
        username,
        email,
        password:hashedPassword
    });
    try{
        await newUser.save();
        res.status(201).json({
            success:true,
            message:"User created successfully"
        })}catch(err){
            return next(errorHandler(500,err.message))
        }
        
}

export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email:email});
        if(!user){
            return next(errorHandler(400,"Invalid Credentials"))
        }
        const isValidPassword=await bcrypt.compare(password,user.password);
        if(!isValidPassword)
        {
            return next(errorHandler(400,"Wrong Credentials"))
        }

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        user.password=undefined;
        res.cookie("access_token",token,
            {
                domain: "avinotes.onrender.com", // No protocol (https://), no trailing slash
                path: "/",
                httpOnly: true,
                secure: true, // Required for HTTPS
                sameSite: "None", // Required for cross-origin requests
              }
        ).status(200).json({
            success:true,
            message:"User logged in successfully",
            user:user
        })

     }catch(err){next(errorHandler(500,err.message))}
}

export const signout=(req,res)=>{
    res.clearCookie("access_token", {
        domain: ".avinotes.onrender.com",
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "None",
      }).status(200).json({
        success: true,
        message: "User logged out successfully"
      });
}
export const checkAuth=async(req,res)=>{
    if (!req.cookies.access_token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const token = req.cookies.access_token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user= await User.findById(decodedToken.id).select("-password");
    if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    res.json({ success: true ,user});

}