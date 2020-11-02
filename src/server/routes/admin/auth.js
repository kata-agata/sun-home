const express = require('express');
const Realization = require('./../../../models/realization');
const router = express.Router();


//------------SIGN IN
router.get('/signin', (req,res)=>{
    res.render('signin', {title: "login"});
})

//------------SHOW ADMIN PANEL MAIN PAGE
router.get('/',(req,res)=>{
  res.render('adminPanel', {title: 'Sun-home Admin Panel'})
})

module.exports = router;
