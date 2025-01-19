// src/app.js
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"


const app = express();
app.use(cookieParser());
// Add middleware, routes, etc.
app.use(cors({
   credentials: true, 
   origin:process.env.CORS_ORIGIN 
   }));
//  // Adjust the origin as needed

app.use(express.static("public"))
app.use(express.json({limit:"16kb"})); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true ,limit:"16kb"})); // Parse URL-encoded data
console.log("hi")
// Example route
// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });

import userRouter from './Routes/user.routs.js'

//router declaration 

//console.log("hi")
app.use("/api/v1/users",userRouter);

app.post("/test", (req, res) => {
   console.log("Request Body:", req.body); // Log the request body
   res.status(200).json({ message: "Test POST route works!" });
});





console.log("hi")



export { app };  // Correct export
