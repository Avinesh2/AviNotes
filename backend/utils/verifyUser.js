import {errorHandler} from './error.js';
import jwt from 'jsonwebtoken';

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token
    if(!token){
        return next(errorHandler(401,"Unauthorised"))
    }
    try{
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;
        next();
    }catch(err){
        return next(errorHandler(401,err.message))
        
    }
}