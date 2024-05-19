import jwt from 'jsonwebtoken';
import config from '../app/config.js';

//Middlehwre of autentication
const authenticateToken = (req,res,next) =>{

    const token = req.cookies.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);

    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, config.ACCESS_TOKEN_SECRET,(err, user) =>{
        if (err) {
            return res.redirect('/login');
        }
        req.user = user;
        next();
    });
};

const redirectIfAutheticated = (req,res,next)=>{

    const token = req.cookies.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);

    if (token) {
        jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err,user)=>{
            if (user) {
                return res.redirect('/index');
            }
            next();
        });
    } else {
        next();
    }
}

export  {
    authenticateToken,
    redirectIfAutheticated
}