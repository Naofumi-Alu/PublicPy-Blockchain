import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { env} from 'process';
import config from '../app/config.js';


// Usuarios de prueba
const users = [
    { username: 'testuser1', password: await bcrypt.hash('password1', 10) },
    { username: 'testuser2', password: await bcrypt.hash('password2', 10) },
    { username: 'testuser3', password: await bcrypt.hash('password3', 10) }
  ];

const login = async (users,req,res)=>{
    const {username, password}=req.body;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.render('login',{ error: 'User not found'});
    }
    if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({ username:user.username}, config.ACCESS_TOKEN_SECRET,  {expireIn: '1h'});
        res.json({accessToken});
        res.renred('home',{accessToken});
    } else{
        res.render('login', { error: 'incorrect data autentication'});
     
    }
}

export default login;