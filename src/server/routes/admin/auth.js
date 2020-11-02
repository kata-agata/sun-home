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

//------------LIST ALL REALIZATIONS
router.get('/realizations', async (req,res)=>{
  let realizations = await Realization.find().sort({createdAt: 'desc'})
  realizations = realizations.map(r => r.toJSON());
  res.render('partials/admin/realizationsManagement', {
    title: "Sun-home Admin Panel Realizacje",
    realizations: realizations
  })
});

//-----------GO TO NEW REALIZATION FORM
router.get('/realizations/newRealization', (req,res)=>{
  res.render('partials/admin/newRealization', { realization: new Realization()})
})

//------------ SAVE NEW REALIZATION
router.post('/realizations/newRealization', async (req,res, next)=>{
  req.realization = new Realization() //assure that every new post has empty realization object
  next() // going to saveAndRedirect
}, saveAndRedirect('newRealization'))


//-----------GO TO EDIT REALIZATION FORM
router.get('/realizations/edit/:id', async(req,res)=>{
  let realization = await Realization.findById(req.params.id);
  realization = realization.toJSON();
  res.render('partials/admin/editRealization', { realization: realization})
})

//-----------SAVE CHANGES AFTER EDIT
router.put('/realizations/edit/:id', async (req,res, next)=>{
  req.realization = await Realization.findById(req.params.id);
  console.log('edit', req.realization)
  next();
}, saveAndRedirect('/realizations/edit'))


//------------SHOW ONE REALIZATION
router.get('/realizations/:slug', async (req,res)=>{
  let realization = await Realization.findOne({slug: req.params.slug});
  if ( realization === null) res.redirect('../realizations');
  //console.log(realization)
  realization = realization.toJSON();
  res.render('partials/admin/showRealization', {realization: realization});
})




//----------- DELETE REALIZATION
// don't delete with <a> becuse everything from database will be deleted
//use form instead
router.delete('/realizations/:id', async (req,res) => {
  console.log('delete:',req.params.id);
  await Realization.findByIdAndDelete(req.params.id);
  res.redirect('./realizations');
})


//------------ MIDDLEWARE FUNCTION, SAME FOR EDIT AND NEW
function saveAndRedirect(path){
  return async (req,res) => {
    let realization = req.realization;
    realization.title = req.body.title;
    realization.description = req.body.description;
    realization.markdown = req.body.markdown;
    try{
      realization = await realization.save();
      realization = realization.toJSON();
      console.log(realization);
      res.redirect(`/sun/adminPanel/realizations/${realization.slug}`);
    } catch(e){
      console.log(e);
      res.render(`partials/admin/${path}`, {realization: realization})
    }
  }
}

module.exports = router;
