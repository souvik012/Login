import mongoose from "mongoose";
import { DB_NAME } from "../constraints.js";


const connectDB = async() => {
  try {
      const ConnectionIns = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      console.log(`\n MongoDB connected !! DB HOST :${ConnectionIns.connection.host}`);
      
  } catch (error) {
      console.log("MONGODB connection error ",error);
      process.exit(1)
  }
}


export default connectDB