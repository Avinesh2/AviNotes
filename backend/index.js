import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from 'passport';
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

// Debug environment variables
console.log('Environment:', process.env.NODE_ENV);
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID ? 'Present' : 'Missing');
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET ? 'Present' : 'Missing');

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? ["https://avi-notes.vercel.app"] 
  : ["http://localhost:5173"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Initialize passport
app.use(passport.initialize());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

// Import and use routes
import authRouter from "./routes/auth.routes.js";
import noteRouter from "./routes/note.route.js";
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});