import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { dbConnect } from '../../../utils/db';
import { comparePasswords } from '../../../utils/auth';


export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const client = await dbConnect();
                const usersCollection = client.db();
                const foundUser = await usersCollection.collection('users').findOne({email: credentials.email});
                if(!foundUser) {
                client.close();
                throw new Error('User not found');
                }

                const passwordCheck = await comparePasswords(foundUser.password, credentials.password);
                if(!passwordCheck) {
                client.close();
                throw new Error('Invalid Password');
                }
                client.close();
                return {
                    email: foundUser.email
                }
            }
        })
    ]
})