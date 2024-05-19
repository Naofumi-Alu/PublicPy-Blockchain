import express from 'express';
import authenticateToken from '../API/auth.js';
import login from '../API/login.js';

const Routes = express.Router();

Routes.get('/',(req,res)=>{
  res.render('login');
})

Routes.get('/login',(req,res)=>{
  res.render('login');
})
Routes.post('/login',async (req,res)=>{
  await login(req,res);
})

Routes.get('/Signup',(req,res)=>{
  res.render('Signup');
})

Routes.use(authenticateToken);

Routes.get('/home',(req,res)=>{
  res.render('index');
})

Routes.get('/post',(req,res)=>{
  
})

export default Routes;