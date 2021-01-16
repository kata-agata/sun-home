const express = require('express');
const Realization = require('./../../../models/realization');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./../../../models/user');


//------------SIGN IN
router.get('/signin', (req,res)=>{
    res.render('signin', {title: "Strona logowania do panelu admina"});
})

router.post('/signin', async (req,res)=>{
    const {body} = req;
    const {username}=body;
    const {password}=body;

    console.log(username, ":", password);
   let user = new User();
   user = {username: 'Zbyszek', password: "starlight30"};
   console.log(user);
   
   console.log(user);
})

//------------SHOW ADMIN PANEL MAIN PAGE
router.get('/',(req,res)=>{
  res.render('adminPanel', {title: 'Sun-home Admin Panel'})
})

module.exports = router;
