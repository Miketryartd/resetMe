import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './Routes/UserRoute.js';
import habitRoutes from './Routes/HabitsRoute.js';
import reviewRoutes from './Routes/ReviewsRoute.js';
import aiRoutes from './Routes/AIRoute.js';
import PingRoute from "./Routes/PingRoute.js";



const app = express();
app.use(express.json());
app.use(cors());

const mongoose_secretkey = process.env.MONGOOSE_SECRETKEY as string;

app.get('/', (req, res) => {
    res.send("Backend running.");
});

app.use('/api/users', userRoutes);
app.use('/api/user', habitRoutes);
app.use('/api/user/me', reviewRoutes);
app.use('/api/user/me/get', aiRoutes);
app.use('/api/health', PingRoute);



const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await mongoose.connect(mongoose_secretkey);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
});
