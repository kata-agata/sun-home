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
  var user = this;

  const salt = crypto.randomBytes(8).toString('hex');
  const buf = await scrypt(attrs.password, salt, 64);//hashing password

  let password = `${buf.toString('hex')}.${salt}`

  user.password = password;
next();
})


module.exports = mongoose.model('User', userSchema);
