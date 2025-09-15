import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import app from './app.js';

connectDB();

const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});