import express from 'express';
import { signup ,signin, signout, checkAuth} from '../controller/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const app=express();
const router= express.Router();

// routes/google.routes.js

import passport from "passport";
import jwt from "jsonwebtoken";



router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
    
    res.cookie("access_token", token, {
     // domain: ".onrender.com",
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.redirect("https://avi-notes.vercel.app/google-success"); // or homepage
  }
);




router.post('/signup',signup);
router.post('/signin',signin);
router.get('/signout',verifyToken,signout);
router.get('/checkAuth',checkAuth);
export default router