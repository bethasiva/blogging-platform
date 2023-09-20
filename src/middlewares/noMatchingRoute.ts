import { NextFunction, Request, Response } from "express";
import { CreateError } from "../createError/createError";

export const noMatchingRoute = (req: Request, res: Response, next: NextFunction) => {
    return next(new CreateError(404, 'This page was not found'));
}