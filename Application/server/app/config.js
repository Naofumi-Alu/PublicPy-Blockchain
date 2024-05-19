import dotenv from 'dotenv';
import crypto from 'crypto';

//load env cariables from .env file
dotenv.config();

const generateSecretKey = () =>{
    return crypto.randomBytes(64).toString('hex');
}

//Use the secret password from the environment variable or generate a new in development environmnet
const ACCESS_TOKEN_SECRET =process.env.ACCESS_TOKEN_SECRET || generateSecretKey();

export default {
    ACCESS_TOKEN_SECRET
};