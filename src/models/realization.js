const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const {JSDOM} = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);//sanitize html


const realizationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  topImage:{
    type: String,
    required: true
  },
  images: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
})

realizationSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(this.title, {lower:true, strict:true})
  }
  if(this.markdown){
    this.sanitizedHtml= dompurify.sanitize(marked(this.markdown));
  }
  next()
})
//strict:true => remove special characters

module.exports = mongoose.model('Realization', realizationSchema);
