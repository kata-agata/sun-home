const { query } = require('express-validator');

module.exports = {
  requireName: query('name')
    .trim()
    .isLength({min:3, max:80})
    .withMessage('Minimum 3 znaki'),
  requireText: query('text')
    .trim()
    .isLength({min:20, max:500})
    .withMessage('Wymagane między 20 a 500 znaków'),
  requireEmail: query('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be valid email'),
};
