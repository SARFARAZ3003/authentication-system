//we can name index , we will go with server.js
// const express = require('express');
import express from 'express';
import { connectDB } from './db/connectDB.js';      //since we changes type to module , hence we will have to put .js whenever we import from a local file.
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());    //allows us to parse incoming requests:req.body
app.use(cookieParser());    //allows us to parse incoming cookies, i.e, for verifyToken.js

app.get('/', (req, res) => {
    res.send('Hello, World! hey');
});
//app.get() -> Sirf GET '/' pe chalega, POST '/' pe nahi, '/api/auth/login' pe nahi.     app.get() = ek specific HTTP request handle karta hai


//now instead of just hello page lets create a route.
app.use("/api/auth", authRoutes);                       //Is path se start hone wali har request ko yaha bhej do i.e, authRoutes pe.

//app.use() = middleware / route group attach karta hai.    ALL HTTP methods (GET, POST, PUT, DELETE…).     Middleware ya router ko mount karta hai.



app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on address: http://localhost:"+PORT);  
})

