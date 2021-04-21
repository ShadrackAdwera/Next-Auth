import { getSession } from 'next-auth/client';
import { comparePasswords, hashPassword } from '../../../utils/auth';
import { dbConnect } from '../../../utils/db';

export default handler = async(req,res) => {
    if(req.method==='PATCH') {
        const session = await getSession({req: req});
        if(!session) {
            res.status(401).json({message: 'Auth failed!'});
            return;
        } 
        const email = session.user.email;
        const { oldPassword, newPassword } = req.body;
        const client = await dbConnect();
        const db = client.db();
        const foundUser = db.collection('Users').findOne({email: email});
        if(!foundUser) {
            res.status(404).json({message: 'User not found'})
            client.close();
            return;
        }
        const isPassword = await comparePasswords(foundUser.password, oldPassword);
        if(!isPassword) {
            res.status(422).json({message: 'Passwords do not match'});
            client.close();
            return;
        }
        const hashedPassword = await hashPassword(newPassword);
        await db.collection('Users').updateOne({email: email},{$set: {password: hashedPassword}});
        res.status(200).json({message: 'Password updated'});
        client.close();
    }

}