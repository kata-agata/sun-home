const express = require('express');
const Realization = require('./../../../models/realization');
const router = express.Router();



router.get('/signin', (req,res)=>{
    res.render('signin', {title: "login"});
})

router.get('/',(req,res)=>{
  res.render('adminPanel', {title: 'Sun-home Admin Panel'})
})

router.get('/realizations', async (req,res)=>{
  let realizations = await Realization.find().sort({createdAt: 'desc'})
  realizations = realizations.map(r => r.toJSON());
  res.render('partials/admin/realizationsManagement', {
    title: "Sun-home Admin Panel Realizacje",
    realizations: realizations
  })
});

router.get('/realizations/new', (req,res)=>{
  res.render('partials/admin/addRealization', { realization: new Realization()})
})

router.get('/realizations/:slug', async (req,res)=>{
  let realization = await Realization.findOne({slug: req.params.slug});
  if ( realization === null) res.redirect('../realizations');
  //console.log(realization)
  realization = realization.toJSON();
  res.render('partials/admin/showRealization', {realization: realization});
})

router.post('/realizations/new', async (req,res)=>{
  let realization = new Realization({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  })

  try{
    realization = await realization.save();
    realization = realization.toJSON();
    console.log(realization);
    res.redirect(`../realizations/${realization.slug}`);
  } catch(e){
    console.log(e);
    res.render('partials/admin/addRealization', {realization: realization})
  }
})

module.exports = router;
