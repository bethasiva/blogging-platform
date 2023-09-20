import { connect } from 'mongoose';
import { MONGODB_URL } from './env.config';

export async function connectMongodb() {
    try {
        await connect(MONGODB_URL);
        console.log("Successfully connected to MongoDB.");
    } catch (error) {
        console.error('Connection error', error);
        process.exit();
    }
}
