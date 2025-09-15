import express from 'express';
import cors from 'cors';
import { authRoutes, chatRoutes, chatsRoutes } from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/chats', chatsRoutes);

export default app;