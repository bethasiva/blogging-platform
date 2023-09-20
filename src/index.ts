import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.config';
import { connectMongodb } from './config/db.config';
import { authRoutes, blogPostRoutes } from './routes';
import { errorHandling, noMatchingRoute } from './middlewares';

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your allowed origin(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (e.g., cookies, authorization headers)
}));

declare global {
    namespace Express {
        interface Request {
            authorId?: string;
        }
    }
}

app.use('/api/auth', authRoutes);
app.use('/api/blogPosts', blogPostRoutes);
app.use(noMatchingRoute);
app.use(errorHandling);

async function startServer() {
    try {
        await connectMongodb();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}

startServer();
