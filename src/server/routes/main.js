const express = require('express');

const router = express.Router();

router.get('/', (req,res)=>{
  res.render('index', {title: 'Sun-home: aranżacja wnętrz, remonty trójmiasto '});
})

module.exports = router;
