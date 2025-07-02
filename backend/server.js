import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import xpRoutes from './routes/xpRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET','POST','OPTIONS'],
  credentials: true
})); 
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//testing route

app.get("/",(req,res)=>{
    res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/xp", xpRoutes);
app.use('/api/dashboard', dashboardRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));