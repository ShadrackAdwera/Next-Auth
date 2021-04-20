import { MongoClient } from 'mongodb';

export const dbConnect = async() => {
    try {
        const client = await MongoClient.connect(process.env.DB_URL);
        console.log('COnnecting to DB...');
        return client;
    } catch (error) {
        
    }
}