import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';

const app=express(); 


await connectDB();

//Middlewares
    
app.use(cors());
app.use(express.json()); 
app.use('/api/admin',adminRouter);

app.get('/',(req,res)=>{
    res.send("API is working");
})

const PORT=process.env.PORT || 3000; 

app.listen(PORT,()=>{console.log("Server is running in port "+PORT)});

export default app;