import { dbConnect } from '../../../utils/db';
import { hashPassword } from '../../../utils/auth';

const handler = async(req,res) => {
    const { email, password } = req.body;

    if(!email || !email.includes('@') || !password || password.trim().length<6) {
        res.status(422).json({message: 'Password should be at least 6 characters long'});
        return;
    }
    const hashedPassword = await hashPassword(password);

    const client = await dbConnect();
    const db = client.db();
    const res = await db.collection('users').insertOne({email: email, password: hashedPassword});
    res.status(201).json({message: 'User Created'});

}   

export default handler;