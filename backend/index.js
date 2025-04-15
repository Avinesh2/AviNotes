import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import "./config/passport.js"; // your passport setup file
dotenv.config();
const app = express();
//This is sent in JSON format, which is like a universal format to send structured data.
//But Express (by default) doesn't understand JSON — unless you tell it to using:
// If a user sends this data:

// {
//   "email": "avi@gmail.com",
//   "password": "avi123"
// }
// Without express.json(), req.body will be undefined. The server won't understand the incoming data.
app.use(express.json());
//Without cookieParser(), req.cookies will be undefined, and you won’t be able to read user session data.
app.use(cookieParser());
const allowedOrigins = ["http://localhost:5173", "https://avinotes-1.onrender.com","https://avi-notes.vercel.app"];

app.use(
  cors({
    origin: allowedOrigins, // Allow multiple origins
    credentials: true, // Important for sending cookies
  })
);


dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.log("Error connecting to MongoDB", err);
});
//import routes 
import authRouter from "./routes/auth.routes.js";
import noteRouter from "./routes/note.route.js";
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//error handling ye krta agr response m koi error aata to isse hoke jaata
app.use(session({
  secret: process.env.SESSION_SECRET || "random_secret",
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());


app.use((err,req,res,next)=>{
  const statusCode=err.statusCode||500;

  const message=err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  });
})