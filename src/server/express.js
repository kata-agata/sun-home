if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRouter = require('./routes/admin/auth');
const realizationsRouter = require('./routes/admin/realizations');
const opinionsRouter = require('./routes/admin/opinions');
const mainRouter = require('./routes/main');
var handlebars = require('express-handlebars');
const dateFormat = require('../views/helpers/dateFormat');
const methodOverride = require('method-override');

const bodyParser = require('body-parser');


const server = express();


const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;


mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.sepqc.mongodb.net/sun-home?retryWrites=true&w=majority`,{
    //mongoose.connect('mongodb://localhost/blog',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
  }, function(err){
    if (err) return console.error(err);
  });


mongoose.connection.on("error", (e) => {
  console.log("mongo connect error!");
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}

// mongoose.connect("mongodb://@ds213645.mlab.com:13645/techblog", {
//   useNewUrlParser: true,
//   auth: {
//     user: "user",
//     password: "pass"
//   }
// });

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
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(express.urlencoded({extended: false})); // to access parameters of form
server.use(methodOverride('_method')); //override delete/put method

//handlebars.registerPartial('home', path.join(__dirname, "/../views/partials/_home"));






// ----------- paths

server.use('/testapp/adminPanel', authRouter); // must go after urlencoded
server.use('/testapp/adminPanel/realizations', realizationsRouter);
server.use('/testapp', mainRouter);
server.use('/testapp/adminPanel/opinions', opinionsRouter);

// server.get('*', function (req, res, next) {
//   const error = new Error(
//     `${req.ip} tried to access ${req.originalUrl}`,
//   );
//   error.statusCode = 301;
//   next(error);
// });

server.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;
  return res.status(error.statusCode);
});




const PORT = process.env.PORT || 8080;
server.listen(PORT, ()=>{
  console.log(`Server is listening on http://localhost:${PORT}`);
  console.log(__dirname);
});
