import mongoose from "mongoose";

const mongoDbConnect= async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to MongoDB successfully , host : ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error connecting to MongoDB : ${error.message}`)
        process.exit(1)
    }
}

export default mongoDbConnect;