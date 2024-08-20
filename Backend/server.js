import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import cors from 'cors';

const app = express();

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(5000,()=>{
    console.log("Backend server is running")
})