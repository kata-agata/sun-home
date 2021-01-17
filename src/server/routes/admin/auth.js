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
   user.username=process.env.ADMIN_USER;
   user.password=process.env.ADMIN_PASS;

    // Save newUser object to database
    user.save(function(err,user) {
        if (err) throw err;
    });
// user.save((err, user) => {
//     if (err) {
//         return res.status(400).send({
//             message : "Failed to add user."
//         });
//     }
//     else {
//         return res.status(201).send({
//             message : "User added successfully."
//         });
//     }
// });
});

//------------SHOW ADMIN PANEL MAIN PAGE
router.get('/',(req,res)=>{
  res.render('adminPanel', {title: 'Sun-home Admin Panel'})
})

module.exports = router;
