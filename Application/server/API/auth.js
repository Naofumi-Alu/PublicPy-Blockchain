import jwt from 'jsonwebtoken';
import { env } from 'process';
import config from '../app/config.js';

//Middlehwre of autentication
const authenticateToken = (req,res) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' '[1]);

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, config.ACCESS_TOKEN_SECRET,(err, user) =>{
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

export default authenticateToken;