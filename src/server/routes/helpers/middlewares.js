const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
//all middlewares must be functions
//next is reference
module.exports = {
  handleErrors(templateFunc, dataCb) {
    return async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        let data = {}; // to prevent undefined

        if(dataCb){
          data = await dataCb(req);
        }
        console.log(data);
      //  return res.send(templateFunc({errors, ...data}));
      }
      next();
    };
  },
  requireAuth(req, res, next) {
    if (!req.session.userId) {
      return res.redirect('/signin');
    }

    next();
  },
  authenticateJWT(req, res, next){
    async function help(){
      const token = req.cookies.token || '';
      console.log(token);

      if (token) {
          //const token = authHeader.split('=')[1]; // Bearer TOKEN -> split token

          await jwt.verify(token, accessTokenSecret, (err, user) => {
              if (err) {
                  return res.sendStatus(403);
              }
              console.log(user);
              req.user = user;
              next();
          });
      } else {
          res.sendStatus(401);
      }

    }
     help();

}
}
