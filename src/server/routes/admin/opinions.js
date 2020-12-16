const express = require('express');
const Opinion = require('./../../../models/opinion');
const router = express.Router();
const path = require('path');

router.get('/', async (req,res) => {
  let opinions = await Opinion.find();
  opinions = opinions.map(o => o.toJSON());
  res.render('partials/admin/opinionsManagement', {
    title: "Sun-home Admin Panel Opinie",
    opinions: opinions
  })
});


router.get('/newOpinion', (req,res)=>{
  res.render('partials/admin/newOpinion')
  //res.send('this new opnion')
});

router.post('/newOpinion', async (req,res  , next)=> {
  req.opinion = new Opinion(); //assure every opinon has empty object to add data
  next();
}, saveAndRedirect('newOpinion'))


//------------ MIDDLEWARE FUNCTION, SAME FOR EDIT AND NEW
function saveAndRedirect(path){
  return async (req,res) => {
    let opinion = req.opinion;
    opinion.content = req.body.content;
    opinion.author = req.body.author;
    console.log(opinion);
    try{
      opinion = await opinion.save();
      opinion = opinion.toJSON();
      console.log(opinion);
      res.redirect(`/testapp/adminPanel/opinions/${opinion._id}`);
    } catch(e){
      console.log(e);
      res.render(`partials/admin/${path}`, {opinion: opinion})
    }
  }
}

module.exports = router;
