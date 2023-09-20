import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/env.config';

export const verifyToken = (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}