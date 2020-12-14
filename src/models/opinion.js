const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const {JSDOM} = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);//sanitize html

const opinionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
});

opinionSchema.pre('validate', function(next) {
  if(this.content){
    this.sanitizedHtml= dompurify.sanitize(marked(this.content));
  }
  next()
});

module.exports = mongoose.model('Opinion', opinionSchema);
