const express = require('express');

const router = express.Router();

router.get('/sun/signin', (req,res)=>{
    res.render('signin', {title: "login"});
})

module.exports = router;