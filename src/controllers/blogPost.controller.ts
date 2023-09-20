import { NextFunction, Request, Response } from 'express';
import { BlogPost } from '../models/blogPost.model';
import { CreateError } from '../createError/createError';
import { blogPostsPagination } from '../middlewares/blogPostsPagination';

// Controller function to fetch all blogPosts (Pagination support added)
export const getAllblogPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await blogPostsPagination(req, res, next);
    } catch (error) {
        return next(new CreateError(500, 'Error fetching blog posts'));
    }
};

// Controller function to fetch all blogPosts of Author by ID (Pagination support added)
export const getAllAuthorblogPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await blogPostsPagination(req, res, next);
    } catch (error) {
        return next(new CreateError(500, "Error fetching all author's blog posts"));
    }
};


// Controller function to fetch a specific blogPost by ID
export const getblogPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) {
            return next(new CreateError(404, 'Blog post not found'));
        }

        res.json(blogPost);
    } catch (error: any) {
        if (error.name === 'CastError') {
            return next(new CreateError(400, 'Invalid blog post ID format'));
        }

        return next(new CreateError(500, 'Internal server error'))
    }
};

// Controller function to create a new blogPost
export const createblogPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content } = req.body;

        const newBlogPost = new BlogPost({
            title,
            content,
            author: req.authorId
        });
        await newBlogPost.save();

        return res.status(201).json({ message: 'Blog post created successfully' });
    } catch (error: any) {
        if (error.errors) {
            // Handle validation errors
            if (error.errors.title) {
                return next(new CreateError(422, error.errors.title.message));
            }

            if (error.errors.content) {
                return next(new CreateError(422, error.errors.content.message));
            }
        }
        if (error.code === 11000 || error.name === 'MongoError') {
            return next(new CreateError(409, 'Please change title and content.'));
        }
        return next(new CreateError(500, 'Internal server error'))
    }
};

// Controller function to update a specific blogPost by ID
export const updateblogPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) {
            return next(new CreateError(404, 'Blog post not found'));
        }

        // Check if the authenticated user is the author of the blog post
        if (blogPost.author.toString() !== req.authorId) {
            return next(new CreateError(403, 'Unauthorized to update this blog post'));
        }

        const { title, content } = req.body;
        if (title) {
            blogPost.title = title;
        }
        if (content) {
            blogPost.content = content;
        }

        await blogPost.save();

        return res.status(200).json({ message: 'Blog post updated successfully' });
    } catch (error: any) {
        if (error.code === 11000 || error.name === 'MongoError') {
            return next(new CreateError(409, 'Please change title and content.'));
        }
        return next(new CreateError(500, 'Error updating blog post'));
    }
};

// Controller function to delete a specific blogPost by ID
export const deleteblogPost = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const blogPost = await BlogPost.findById(req.params.id);

        if (!blogPost) {
            return next(new CreateError(404, 'Blog post not found'));
        }
        // Check if the authenticated user is the author of the blog post
        if (blogPost.author.toString() !== req.authorId?.toString()) {
            return next(new CreateError(403, 'Unauthorized to delete this blog post'));
        }

        await blogPost.deleteOne();
        return res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error: any) {

        if (error.name === 'CastError') {
            return next(new CreateError(400, 'Invalid blog post ID'));
        }

        return next(new CreateError(500, 'An error occurred while deleting the blog post'));
    }
};
