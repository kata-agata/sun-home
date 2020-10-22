const express = require('express');

const router = express.Router();

router.get('/sun/signin', (req,res)=>{
    res.render('partials/signin');
})

module.exports = router;
