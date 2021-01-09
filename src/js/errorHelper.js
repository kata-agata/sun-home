module.exports = {
  getError(errors, param) {
    //param === 'email' || 'name' || 'text'
    try {
      return errors.filter(error => error.param === param).map(error => error.msg).toString(); //return the message
    } catch (err) {
      return ''; //cheat, when errors doesnt exist return empty string
    }
  }
}
