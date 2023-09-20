import { Response } from "express";

export const handleSignupError = (error: any, res: Response) => {
    if (error.errors) {
        // Handle validation errors
        if (error.errors.username) {
            // Handle the 'username' validation error
            return res.status(400).json({ message: error.errors.username.message });
        }
        if (error.errors.email) {
            // Handle the 'email' validation error
            return res.status(400).json({ message: error.errors.email.message });
        }
        if (error.errors.password) {
            // Handle the 'password' validation error
            return res.status(400).json({ message: error.errors.password.message });
        }
    } else if (error.code === 11000 || error.name === 'MongoError') {
        // Handle duplicate key error (e.g., email or username already exists)
        return res.status(409).json({ message: 'Email or username is already in use' });
    } else {
        // Handle other unexpected errors
        console.error('Sign-up error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}





