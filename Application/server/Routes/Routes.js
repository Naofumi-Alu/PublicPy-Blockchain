import express from 'express';
import {authenticateToken, redirectIfAutheticated} from '../API/auth.js';
import login from '../API/login.js';

const Routes = express.Router();


Routes.get('/login',redirectIfAutheticated,(req,res)=>{
  res.render('login');
})
Routes.post('/login',async (req,res)=>{
  //console.log("request ", req.body);
  //console.dir(req , {depth:null});
  await login(req,res);
})

Routes.get('/Signup',(req,res)=>{
  res.render('Signup');
})

Routes.use(authenticateToken);

Routes.get('/index',(req,res)=>{
  res.render('index');
})

Routes.get('/post',(req,res)=>{
  
})

export default Routes;