import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
  origin: "http://localhost:5173", // Frontend URL
  credentials: true // Allow cookies (important for JWT auth)
}));

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
app.use((err,req,res,next)=>{
  const statusCode=err.statusCode||500;

  const message=err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  });
})