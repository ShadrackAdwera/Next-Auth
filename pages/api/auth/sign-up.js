import { hashPassword } from '../../../utils/auth';
import { MongoClient } from 'mongodb';

const dbConnect = async() => {
    const client = await MongoClient.connect(process.env.DB_URL);
    return client;
}

const handler = async(req, res) => {
    if(req.method==='POST') {
        const { email, password } = req.body;

    if(!email || !email.includes('@') || !password || password.trim().length<6) {
        console.log({email, password});
        res.status(422).json({message: 'Password should be at least 6 characters long'});
        return;
    } 
    let db;
    let client;
    let foundUser;
    
    try {
    client = await dbConnect();
    db = client.db();
    } catch (error) {
        console.log(error);
    }

    try {
        foundUser = await db.collection('users').findOne({email: email});
    } catch (error) {
        console.log(error);
    }
    if(foundUser) {
        res.status(422).json({message:'Email already exists'});
        client.close();
        return;
    }


    try {
    const hashedPassword = await hashPassword(password);
    const response = await db.collection('users').insertOne({email: email, password: hashedPassword});
    res.status(201).json({message: 'User Created'});
    client.close();
    } catch (error) {
        console.log(error);
    }

    }

}   

export default handler;