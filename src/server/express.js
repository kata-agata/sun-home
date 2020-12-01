const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRouter = require('./routes/admin/auth');
const realizationsRouter = require('./routes/admin/realizations');
const mainRouter = require('./routes/main');
var handlebars = require('express-handlebars');
const dateFormat = require('../views/helpers/dateFormat');
const methodOverride = require('method-override');


const server = express();

mongoose.connect('mongodb://localhost/blog',{
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});

const isProd = process.env.NODE_ENV ==="production";

if(!isProd){
  const webpack = require("webpack");
  const config = require("../../config/webpack.dev.js");
  const compiler = webpack(config);

  const webpackDevMiddleware = require("webpack-dev-middleware")(
    compiler,
    config.devServer
  ); // IIFE

  const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);

  server.use(webpackDevMiddleware);
  server.use(webpackHotMiddleware);
}

// const staticMiddleware = express.static("dist");
// server.use(staticMiddleware);
server.use('/images', express.static('dist'))


// ------------handlebars configuration
const hbs = handlebars.create({
  layoutsDir: path.join(__dirname, "/../views/layouts"),
  partialsDir: path.join(__dirname, "/../views/partials"),
  defaultLayout: 'layout',
  extname: '.hbs',
  helpers: {
    dateFormat
  }
});
server.engine('hbs', hbs.engine);
server.set('view engine', 'hbs');
server.set('views', path.join(__dirname, "/../views"));


server.use(express.urlencoded({extended: false})); // to access parameters of form
server.use(methodOverride('_method')); //override delete/put method

//handlebars.registerPartial('home', path.join(__dirname, "/../views/partials/_home"));
// ----------- paths

server.use('/sun/adminPanel', authRouter); // must go after urlencoded
server.use('/sun/adminPanel/realizations', realizationsRouter);
server.use(mainRouter);

const PORT = process.env.PORT || 8080;
server.listen(PORT, ()=>{
  console.log(`Server is listening on http://localhost:${PORT}`);
    console.log(__dirname);
});
