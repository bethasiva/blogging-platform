import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { User } from '../models';
import { CreateError } from '../createError/createError';
import { sendToken } from '../utils/sendToken';
import { handleSignupError } from '../utils/handleSignUpError';

export const signUp = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const user = new User({ username, email, password });
        await user.save();

        return res.status(200).json({ message: 'User was created successfully!' });

    } catch (error: any) {
        handleSignupError(error, res);
    }
};


export const signIn = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new CreateError(422, 'Please enter email and password'));
        }

        if (!validator.isEmail(email)) {
            return next(new CreateError(401, 'Invalid email.'));
        }

        const user = await User.findOne({ email })

        if (!user) {
            return next(new CreateError(404, 'User was not found.'));
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return next(new CreateError(401, 'Invalid email or password.'));
        }

        sendToken(user, 200, res);

    } catch (error) {
        return next(new CreateError(500, 'Internal server error'));
    }
}

export const logOut = async (req: Request, res: Response) => {
    return res.clearCookie('x-access-token').status(200).json({ message: 'User logged out successfully' });
}




