import express from 'express';

const Routes = express.Router();

Routes.get('/',(req,res)=>{
  res.render('login');
})

Routes.get('/Signup',(req,res)=>{
  res.render('Signup');
})

Routes.get('/home',(req,res)=>{
  res.render('index');
})

Routes.get('/post',(req,res)=>{
  
})

export default Routes;