const express = require('express');
const Realization = require('./../../models/realization');
const Opinion = require('./../../models/opinion');
const router = express.Router();

router.get('/', async (req,res, next)=>{
  let realizations = await Realization.find().sort({createdAt: 'desc'}).catch(next);
  let opinions = await Opinion.find().limit(4).catch(next);

  realizations = realizations.map(r => r.toJSON());
  opinions = opinions.map(o => o.toJSON());
  res.render('index', {
    title: 'Sun-home: aranżacja wnętrz, remonty trójmiasto',
    realizations: realizations,
    opinions: opinions
  });
})

module.exports = router;
