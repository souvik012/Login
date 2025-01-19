// // src/index.js
// import { app } from "./app.js";  // Correct import

// // Your other logic for connecting to the database, etc.
// import dotenv from "dotenv";
// import connectDB from "./Db/index.js";
// dotenv.config({ path: './env' });

// connectDB().then(() => {
//   app.listen(process.env.PORT || 8000, () => {
//     console.log(`Server is running on port ${process.env.PORT || 8000}`);
//   });
// }).catch((err) => {
//   console.log("MongoDB connection failed!", err);
// });



import dotenv from "dotenv"
import connectDB from "./Db/index.js"
import {app} from "./app.js"

dotenv.config({
  path:'./env'
})

connectDB()
.then(()=>{
  app.listen(process.env.PORT||8000,()=>{
    console.log(`Server is running on :${process.env.PORT}`);
    
  })
})
.catch((err)=>{
  console.log("MONGO db connection failed!!!", err);
  
})
