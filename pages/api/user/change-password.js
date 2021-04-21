import { getSession } from 'next-auth/client';

export default handler = async(req,res) => {
    if(req.method==='PATCH') {
        const session = await getSession({req: req});
        if(!session) {
            res.status(401).json({message: 'Auth failed!'});
            return;
        }
        
    }

}