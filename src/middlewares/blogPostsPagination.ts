import { NextFunction, Request, Response } from "express";
import { BlogPost } from "../models";
import { CreateError } from "../createError/createError";

export const blogPostsPagination = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let blogPosts = [];
        let totalPosts = 0;
        const currentPage = parseInt(req.body.currentPage) || 1;
        const perPage = parseInt(req.body.perPage) || 10;
        const authorObject: any = {};

        if (req.authorId) {
            authorObject.author = req.authorId;
        }

        totalPosts = await BlogPost.countDocuments(authorObject);
        blogPosts = await BlogPost.find(authorObject)
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });

        const totalPages = Math.ceil(totalPosts / perPage);
        const paginationData = {
            blogPosts,
            totalPages,
            nextPage: currentPage + 1,
            shouldFetch: true
        };

        if (totalPages <= currentPage) {
            paginationData.shouldFetch = false;
        }

        return res.status(200).json(paginationData);
    } catch (error) {
        return next(new CreateError(500, 'Internal server error.'));
    }
}
