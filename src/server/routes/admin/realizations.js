const express = require('express');
const Realization = require('./../../../models/realization');
const router = express.Router();
const multer = require('multer');

const path = require('path');
const fs = require('fs');
const { authenticateJWT} = require('../helpers/middlewares');

// SET STORAGE
//------ uploading multiple files into directory /public_html/images/{realization.slug} on remote server
//------ create folder if not exist
//------ change file name


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { slug } = req.params;
    const path = `../public_html/images/${slug}`
    //const path = `./images/${slug}`
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
router.get('/', authenticateJWT, async (req,res)=>{
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
router.get('/:slug', async (req,res,next)=>{
    let realization = await Realization.findOne({slug: req.params.slug}).catch(next);
    if(realization === null) return res.redirect('/testapp/adminPanel/realizations'); // return statement is needed to finish executing this FUNCTION/
    //otherwise the function in continued and second response is sent from server
    //this gives error Error [ERR_HTTP_HEADERS_SENT] [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    //console.log('nuul?', realization)
    let realizations = [realization];
  try{

    realizations = realizations.map(r => r.toJSON());
  } catch (err) {
    next(err);
  }
  res.render('partials/admin/showRealization', {realizations: realizations});
})

//----------- DELETE REALIZATION
// don't delete with <a> becuse everything from database will be deleted
//use form instead
router.delete('/:id', async (req,res) => {
  console.log('delete:',req.params.id);
  await Realization.findByIdAndDelete(req.params.id);
  res.redirect('/testapp/adminPanel/realizations');
})

//----------- DELETE REALIZATION image
// don't delete with <a> becuse everything from database will be deleted
//use form instead
router.delete('/:slug/:id', async (req,res,next) => {
  const {slug,id} = req.params;
  let realization = await Realization.findOne({slug: slug}).catch(next);
  let newImages = realization.images.filter(function (image, index) {
    return index!==parseInt(id)
  }); //parseINt, because req.params.id is a string

  let update = await Realization.updateOne({slug: slug},{images: newImages}, ()=>{});
  //res.redirect('/testapp/adminPanel/realizations');
  realization.images = newImages;
  console.log(update);
  //res.render(`/partials/realization`, {realization});
  //  res.redirect(`/testapp/adminPanel/realizations/${slug}`);
  if(update.ok === 1){
    res.sendStatus(200)
  } else{
    res.sendStatus(400).json({status: "error"});
  }

})

//----------- SET TOPIMAGE FOR PROJECT
router.put('/:slug', async (req,res)=>{
  //req.query => '0':'url path'
  //req.params {slug}
  let realization = await Realization.updateOne({slug: req.params.slug},{topImage: req.query[0]}, ()=>{});

})


//Uploading multiple files
router.post('/uploadmultiple/:slug', upload.array('myFiles', 12), async (req, res, next) => {
  const files = req.files;
  let realization = await Realization.findOne({slug: req.params.slug});
  const newImages = files.map( f => {
    let url = f.path;
    //url = url.replace('dist', 'images'); localhost
    url = url.replace('../public_html/', '');
    return url;
  });
  realization.images = [...realization.images, ...newImages];
  console.log(realization);
  try{
    realization = await realization.save();
    realization = realization.toJSON();
    console.log("to:", files);
  } catch(e){
    console.log(e);
    res.send(files);
  }


  const slug = req.params.slug;
  if (!files) {
    const error = new Error('Please choose files');
    error.httpStatusCode = 400;
    return next(error);
  }
  res.redirect(`/testapp/adminPanel/realizations/${slug}`);
})




//------------ MIDDLEWARE FUNCTION, SAME FOR EDIT AND NEW
function saveAndRedirect(path){
  return async (req,res) => {
    let realization = req.realization;
    realization.title = req.body.title;
    realization.description = req.body.description;
    //realization.topImage = realization.topImage;
    //realization.images = req.body.images;
    realization.markdown = req.body.markdown;
    //console.log(realization);
    try{
      realization = await realization.save();
      realization = realization.toJSON();
      console.log('save after edit:', realization);
      res.redirect(`/testapp/adminPanel/realizations/${realization.slug}`);
    } catch(e){
      console.log(e);
      res.render(`partials/admin/${path}`, {realization: realization})
    }
  }
}

module.exports = router;
