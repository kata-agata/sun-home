const jwt = require("jsonwebtoken");

module.exports = {
  generateToken(res, username){
    const expiration = 24*60*60;
    const accsessToken = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '7d',
    });

    return res.cookie('token', accsessToken, {
      expires: new Date(Date.now() + expiration),
      secure: false, //set true if https
      httpOnly: true,
    })
  }
}
