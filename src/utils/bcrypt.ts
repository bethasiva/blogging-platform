import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {

    try {
        const saltRounds = 8;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

export async function comparePassword(password_1: string, password_2: string) {
    return await bcrypt.compare(password_1, password_2);
}