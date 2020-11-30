const express = require('express');
const Realization = require('./../../models/realization');
const router = express.Router();

router.get('/', async (req,res)=>{
  let realizations = await Realization.find().sort({createdAt: 'desc'});
  realizations = realizations.map(r => r.toJSON());
  res.render('index', {
    title: 'Sun-home: aranżacja wnętrz, remonty trójmiasto',
    realizations: realizations
  });
})

module.exports = router;
