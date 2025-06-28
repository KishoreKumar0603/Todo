import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes.js';
import session from "express-session";
import passport from "passport";
import './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import taskRoutes from "./routes/taskRoutes.js";
dotenv.config();

const app = express();
const Port = process.env.PORT || 5000;
const allowedOrigins = [
  process.env.CLIENT_URL,
  
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);




mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("MongoDB connected... URL "+process.env.MONGO_URI);
  app.listen(Port,()=> console.log("Server Running " + Port));
})
.catch((error) => console.error(error));