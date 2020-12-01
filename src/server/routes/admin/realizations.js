const express = require('express');
const Realization = require('./../../../models/realization');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { id } = req.params;
    const path = `./uploads/${id}`
    fs.mkdirSync(path, { recursive: true })
    cb(null, path)
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })
//var upload = multer({dest: 'uploads/'})

//------------LIST ALL REALIZATIONS
router.get('/', async (req,res)=>{
  let realizations = await Realization.find().sort({createdAt: 'desc'})
  realizations = realizations.map(r => r.toJSON());
  res.render('partials/admin/realizationsManagement', {
    title: "Sun-home Admin Panel Realizacje",
    realizations: realizations
  })
});

//-----------GO TO NEW REALIZATION FORM
router.get('/newRealization', (req,res)=>{
  res.render('partials/admin/newRealization', { realization: new Realization()})
})

//------------ SAVE NEW REALIZATION
router.post('/newRealization', async (req,res, next)=>{
  req.realization = new Realization() //assure that every new post has empty realization object
  next() // going to saveAndRedirect
}, saveAndRedirect('newRealization'))

//-----------GO TO EDIT REALIZATION FORM
router.get('/edit/:id', async(req,res)=>{
  let realization = await Realization.findById(req.params.id);
  realization = realization.toJSON();
  res.render('partials/admin/editRealization', { realization: realization})
})

//-----------SAVE CHANGES AFTER EDIT
router.put('/edit/:id', async (req,res, next)=>{
  req.realization = await Realization.findById(req.params.id);
  console.log('edit', req.realization)
  next();
}, saveAndRedirect('/realizations/edit'))


//------------SHOW ONE REALIZATION
router.get('/:slug', async (req,res)=>{
  let realization = await Realization.findOne({slug: req.params.slug});
  if(realization === null) res.redirect('/sun/adminPanel/realizations');
  console.log('nuul?', realization)
  realization = realization.toJSON();
  res.render('partials/admin/showRealization', {realization: realization});
})

//----------- DELETE REALIZATION
// don't delete with <a> becuse everything from database will be deleted
//use form instead
router.delete('/:id', async (req,res) => {
  console.log('delete:',req.params.id);
  await Realization.findByIdAndDelete(req.params.id);
  res.redirect('/sun/adminPanel/realizations');
})

//Uploading multiple files
router.post('/uploadmultiple/:id', upload.array('myFiles', 12), (req, res, next) => {
  const files = req.files;
  const id = req.params.id;
  console.log(id)
  if (!files) {
    const error = new Error('Please choose files');
    error.httpStatusCode = 400;
    return next(error);
  }
    res.send(files);
})




//------------ MIDDLEWARE FUNCTION, SAME FOR EDIT AND NEW
function saveAndRedirect(path){
  return async (req,res) => {
    let realization = req.realization;
    realization.title = req.body.title;
    realization.description = req.body.description;
    realization.topImage = req.body.topImage;
    realization.markdown = req.body.markdown;
    console.log(realization);
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
