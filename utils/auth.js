import { hash, compare } from 'bcryptjs';

export const hashPassword = async(plainPassword) => {
    try {
        const hashedPassword = await hash(plainPassword,12);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}

export const comparePasswords = async(hashedPassword, plainPassword) => {
    let isPassword;
    try {
        isPassword = await compare(hashedPassword, plainPassword)
    } catch (error) {
        console.log(error);
    }
    return isPassword;
}