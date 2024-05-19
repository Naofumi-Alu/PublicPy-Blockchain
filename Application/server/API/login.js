import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import config from '../app/config.js';


// Users data test
const initializeUsers = async () =>{
    return [
        { username: 'testuser1@gmail.com', password: await bcrypt.hash('password1', 10) },
        { username: 'testuser2@gmail.com', password: await bcrypt.hash('password2', 10) },
        { username: 'testuser3@gmail.com', password: await bcrypt.hash('password3', 10) }
    ]
}

// Initialization users
const users = await initializeUsers();

const login = async (req,res)=>{
    const {username, password}=req.body;
    console.log("username: "+username+" password: "+password);
    const user = users.find(u => u.username === username);
    if (!user) {
        console.log("user not found");
        return res.render('login',{ error: 'User not found'});
    }
    if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({ username:user.username}, config.ACCESS_TOKEN_SECRET,  {expiresIn: '1m'});
        console.log("Authenticated");
        console.log(accessToken);
        res.cookie('token',accessToken,{httpOnly:true});
        res.redirect('/index');
    } else{
        console.log("incorrect data autentication");
        res.render('login', { error: 'incorrect data autentication'});
     
    }
}

export default login;