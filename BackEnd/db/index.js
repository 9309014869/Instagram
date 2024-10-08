import mongoose from "mongoose";

import { DB_NAME } from "../constant.js";

const connectDB = async () =>{
    try{
        const connctionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected: ${connctionInstance.connection.host}`);
    }catch(error){
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;