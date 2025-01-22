import app from "./app"; 
import Configuration from "./config";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { initializeRedis } from "./redis.config";
// const { initializeRedis } = require("../src/config/redis.config.ts");

dotenv.config();
const port = process.env.PORT || 4600;
app.listen(Configuration.serverPort , async () => {
    console.log(`App is up and running on Configured port ${port}`);
    
    // Initialize Redis when the app starts
    await initializeRedis();
});


mongoose.set("strictQuery", false);
mongoose.connect(Configuration.Database.url).then(() => {
    console.log('connected to mongoDb');
}).catch((err) => {
    console.error('could not connect to mongoDb\n', err);
});
