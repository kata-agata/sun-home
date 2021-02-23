module.exports = {
  getError(errors, prop) {
    //prop === 'email' || 'password' || 'passwordConfirmation'
    try {
      //errors.mapped() === { email: {msg:'Invalid email'}, password: {msg: 'password too short'}, passwordConfirmation: {msg:'passwords must match'}}
      return errors.mapped()[prop].msg; //return the message
    } catch (err) {
      return ''; //cheat, when errors doesnt exist return empty string
    }
  }
}
