import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// The default values are for your testing purpose only.
export const PORT = process.env.PORT || 3000;
export const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://siva1234:siva1234@bloggingsite.ku3ehjl.mongodb.net/blogging_site';
export const JWT_SECRET_KEY = process.env.SECRET_KEY || 'FdAzOiMhMRNR4kbCqOm8XW52kFAbXVB3';
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '5d';
