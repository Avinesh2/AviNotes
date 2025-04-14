import {errorHandler} from './error.js';
import jwt from 'jsonwebtoken';

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token
    if(!token){
        return next(errorHandler(401,"Unauthorized"))
    }
    try{
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;
        next();
    }catch(err){
        // Clear the invalid token
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        });

        if (err.name === 'TokenExpiredError') {
            return next(errorHandler(401, "Token expired"));
        }
        if (err.name === 'JsonWebTokenError') {
            return next(errorHandler(401, "Invalid token"));
        }
        return next(errorHandler(401, "Authentication failed"));
    }
}