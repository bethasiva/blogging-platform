import { Response } from 'express';
import { UserSchema } from '../models'

const COOKIE_EXPIRE = 5;

export const sendToken = (user: UserSchema, statusCode: number, res: Response) => {

    const token = user.getJWTToken();

    const options = {
        expires: new Date(
            Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,

    };

    const { email, username } = user;

    res.cookie('x-access-token', token, options).status(statusCode).json({
        email,
        username,
        token,
    });
}