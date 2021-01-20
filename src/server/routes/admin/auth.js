const express = require('express');
const {validationResult} = require('express-validator');
const Realization = require('./../../../models/realization');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./../../../models/user');
const {
  requireUsernameExists
} = require('../helpers/formValidator');
const {handleErrors} = require('../helpers/middlewares');

//------------SIGN IN
router.get('/signin', (req,res)=>{
    res.render('signin', {title: "Strona logowania do panelu admina"});
})


router.post('/signin',
async (req,res, next)=>{
    // const {body} = req;
    // const {username}=body;
    // const {password}=body;

    const {username, password} = req.body;
    //console.log(username);
  //  let errors = validationResult(req).array();

    //--------------------adding new user
   // console.log(username, ":", password);
   // let user = new User();
   // user.username=process.env.ADMIN_USER;
   // user.password=process.env.ADMIN_PASS;
   //
   //  // Save newUser object to database
   //  user.save(function(err,user) {
   //      if (err) throw err;
   //  });
   //---------------------------------------
   // if(!errors.length){
   //    let user = await User.findOne({username});
   //    let isValid = await user.comparePassword(password);
   //    if(isValid){
   //      res.redirect("/testapp/adminPanel/");
   //    } else{
   //      return res.json({errors: 'Błędne hasło'});
   //    }
   // }

   let user = await User.findOne({username}, async function(err, user){
     if(user === null){
         res.render("signin",{
           title: "Strona logowania do panelu admina",
           message: "Nie ma takiego użytkownika"})
     }
     else {
       let isValid = await user.comparePassword(password);
       if (isValid){
         res.status(201).redirect("/testapp/adminPanel/")
       } else {
         res.render("signin",{
           title: "Strona logowania do panelu admina",
           message: "Niepoprawne hasło"});
       }
     }
   });

});

//------------SHOW ADMIN PANEL MAIN PAGE
router.get('/',(req,res)=>{
  res.render('adminPanel', {title: 'Sun-home Admin Panel'})
})

module.exports = router;
