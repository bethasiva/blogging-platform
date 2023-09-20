import { NextFunction, Request, Response } from "express";

export const errorHandling = (error: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = error;
  res.status(statusCode).json({ message });
}