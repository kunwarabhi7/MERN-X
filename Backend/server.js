import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';
import { authRouter } from './routes/auth.routes.js';
import mongoDbConnect from './db/connectMongodb.js';

const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());



app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use('/api/auth',authRouter);

app.listen(PORT,()=>{
    console.log(`Backend server is running ${PORT}`)
    mongoDbConnect();
})