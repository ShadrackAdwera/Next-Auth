import { hash } from 'bcryptjs';

export const hashPassword = async(plainPassword) => {
    try {
        const hashedPassword = await hash(plainPassword,12);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}