import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        // console.log("Mongo URI: ",process.env.MONGO_URI)    //by default i cannot access my environmental vairables.  So to solve this we will first have to import dotenv module in our "main" i.e, server.js , then we have to use config(). 
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected : ${conn.connection.host}`)
    } catch (error) {
        console.log("Error connecting to MongoDB : ",error.message)
        process.exit(1)     //1 is failure, 0 status code means success
    }
}