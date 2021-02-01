const express = require('express');
const Realization = require('./../../models/realization');
const Opinion = require('./../../models/opinion');
const router = express.Router();
const nodemailer = require('nodemailer');
const {
  requireName,
  requireText,
  requireEmail,
} = require('./helpers/formValidator');
const { body, validationResult } = require('express-validator');

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
});

//go to single realization page
router.get('/realization/:slug', async (req, res, next) =>{
  let realization = await Realization.findOne({slug: req.params.slug}).catch(next);
  let realizations = [realization];
try{
  realizations = realizations.map(r => r.toJSON());
  } catch (err) {
    next(err);
  }

  console.log("rel:", realization);
  res.render('partials/singleRealizationPage', {realizations});
  //res.render('partials/realization', {realization});
});

// POST route from contact form
router.post('/', [
  requireName,
  requireEmail,
  requireText
], async (req, res, next) => {

  const {name, email, subject, text} = req.query;

  let errors = validationResult(req);
  let message ="";


   let serverResponse = {
     errors: errors.array(),
     message
   };

  // if there are errors send response with errors and empty message
  if (!errors.isEmpty()){
  //   console.log(errors.array());

     res.json(serverResponse);
  }
  // else use nodemailer
  else {
     // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'mail.sun-home.com.pl',
      port: 587,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const mailOpts = {
      from: email, // sender address
      to: process.env.GMAIL_USER, // list of receivers
      subject: `Zapytanie od ${name} - temat: ${subject}`, // Subject line
      text: text, // plain text body
    }

    //sending e-mail and
    //sending json response to be displayed in #message
     let info = await transporter.sendMail(mailOpts, (err,info)=>{
       //serverResponse.errors = "";
       if (err){ //error with invalid auth properties
          serverResponse.message = "Wystąpił błąd, Twoja wiadomość nie została wysłana. Spróbuj później." + err.toString();
          res.json(serverResponse);
       } else { //success
          serverResponse.message =  "Twoja wiadomość została wysłana, skontaktujemy się z Tobą.";
          res.json(serverResponse);
       }
     });
   }
});

module.exports = router;
