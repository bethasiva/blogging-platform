import { Schema, model, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY, JWT_EXPIRE } from '../config/env.config';
import { comparePassword, hashPassword } from '../utils/bcrypt';

interface UserSchema extends Document {
    username: string;
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>;
    getJWTToken: () => string;
}

const userSchema = new Schema<UserSchema>({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username must not be empty.'],
        validate: {
            validator: function (username: string) {
                // The length of the username is at least four characters
                return username.length >= 4;
            },
            message: 'Username must be at least four characters long.',
        },
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email must not be empty.'],
        validate: {
            validator: function (email: string) {
                // Regex pattern for email validation
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
            },
            message: 'Invalid email format.',
        },
    },
    password: {
        type: String,
        required: [true, 'Password must not be empty.'],
        minLength: [8, 'Password must be atleast 8 characters long.'],
        validate: {
            validator: function (password: string) {
                // Regular expression to check if the password contains letters and symbols
                return /^(?=.*[a-zA-Z])(?=.*[\W_]).+$/.test(password);
            },
            message: 'Password must contain both letters and symbols.'
        }
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await hashPassword(this.password);
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ authorId: this._id.toString() }, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE
    });
}

userSchema.methods.comparePassword = async function (password: string) {
    return await comparePassword(password, this.password);
}


export const User = model<UserSchema>('user', userSchema, 'users');
export { UserSchema };
