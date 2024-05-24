import express from 'express';
import mongoose from 'mongoose';

import cors from "cors";
 
import dotenv from 'dotenv';
import userRouter from './routes/user-routes';
import adminRouter from './routes/admin-routes';
import movieRouter from './routes/movie-routes';
import bookingsRouter from './routes/booking-routes';

dotenv.config();

//express use all ref to app variable
const app = express();

//cors to allow client port
app.use(cors({
  origin:"http://localhost:3000",
  method:["GET","POST","PUT","PATCH","DELETE"]
}))

//middlewares
app.use(express.json());
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/movie",movieRouter);
app.use("/booking",bookingsRouter);


mongoose
    .connect(
    `mongodb+srv://msuthan:${process.env.MONGODB_PASSWORD}@cluster0.ae5d0ct.mongodb.net/?retryWrites=true&w=majority`
).then(()=>
    app.listen(5000,() => 
    console.log("Connected to DataBase and server is running")
    )
).catch( (e) => console.log(e) );


// Set middleware of CORS 
app.use((req, res, next) => {

  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://localhost:5000/"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 86400);
  
  next();
  
});

//basic api
// const express = require('express');

// //api route same path 
// app.use("/",(req,res,next) => {

//     res.send("<h1>Hi</h1>");

// });

// //open server
// app.listen(3000, () => {
//     console.log(`connected to localhost port ${3000}`);
// });