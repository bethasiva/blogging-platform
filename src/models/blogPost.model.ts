import { Schema, model, Document } from 'mongoose';

interface BlogPostSchema extends Document {
    title: string;
    content: string;
    author: Schema.Types.ObjectId,
    createdAt: Date
}

const blogPostSchema = new Schema<BlogPostSchema>({
    title: {
        type: String,
        required: [true, 'Please provide title.'],
        unique: true
    },
    content: {
        type: String,
        required: [true, 'Please provide content.'],
        unique: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const BlogPost = model<BlogPostSchema>('blogPost', blogPostSchema, 'blogPosts');