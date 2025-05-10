import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
 const connectdb= async()=>{
  try {
    const conn= await mongoose.connect(process.env.DB)
    console.log("mongodb connect successfully")
  } catch (error) {
    console.log("mongodb error :",error)
  }
 }
 export default connectdb