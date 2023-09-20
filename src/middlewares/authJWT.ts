import { NextFunction, Request, Response } from "express";
import { verifyToken } from '../utils/verifyToken'
import { CreateError } from "../createError/createError";


interface DecodedToken {
    authorId: string;
}

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    let token: string = '';
    if (req.headers.cookie) {
        token = req.headers?.cookie?.split('x-access-token=')[1]
    }

    if (!token) {
        return next(new CreateError(403, "Authentication failed!"));
    }

    const { authorId } = await verifyToken(token) as DecodedToken;

    if (authorId) {
        req.authorId = authorId;
    }
    next();

}