import express from 'express';
import cors from 'cors';

import ConnectDb from './config/mongoDb.js';
import ConnectCloudinary from './config/cloudinary.js';
import addminRouter from './routes/adminroute.js';
import dotenv from 'dotenv';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

dotenv.config();
console.log('Cloudinary Config:', {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

ConnectDb()
ConnectCloudinary();

app.use('/api/admin',addminRouter);
app.use('/api/doctor',doctorRouter);
app.use('/api/user',userRouter);
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
