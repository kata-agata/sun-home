const mongoose = require('mongoose');
const crypto = require('crypto');
const util = require('util')

const scrypt = util.promisify(crypto.scrypt);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    reqired: true
  },
  email: {
    type: String,
  },
})

userSchema.pre('save', async function(next){
  var user=this;
  console.log(user);
   const salt = crypto.randomBytes(8).toString('hex');
   const buf = await scrypt(user.password, salt, 64);//hashing password

   user.password = `${buf.toString('hex')}.${salt}`
   console.log(user);
  next();
})




module.exports = mongoose.model('User', userSchema);
