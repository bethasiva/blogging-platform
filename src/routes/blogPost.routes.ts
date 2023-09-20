import { Router } from 'express';
import { createblogPost, deleteblogPost, getAllAuthorblogPosts, getAllblogPosts, getblogPostById, updateblogPost } from '../controllers/blogPost.controller';
import { verifyAccessToken } from '../middlewares';

const router = Router();

// Public route to fetch all blog Posts
router.get('/', getAllblogPosts);

// Public route to fetch a specific blog Post by ID
router.get('/blogPost/:id', getblogPostById);

// Private routes (require authentication)
router.get('/authorBlogPosts', verifyAccessToken, getAllAuthorblogPosts);
router.post('/createBlogPost', verifyAccessToken, createblogPost);
router.patch('/blogPost/:id', verifyAccessToken, updateblogPost);
router.delete('/blogPost/:id', verifyAccessToken, deleteblogPost);

export default router;