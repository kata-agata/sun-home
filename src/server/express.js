const express = require('express');
const path = require('path');
const authRouter = require('./routes/admin/auth');
const mainRouter = require('./routes/main');
var handlebars = require('express-handlebars');

const server = express();


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

const staticMiddleware = express.static("dist");
server.use(staticMiddleware);



server.engine('hbs', handlebars({
    layoutsDir: path.join(__dirname, "/../views/layouts"),
    partialsDir: path.join(__dirname, "/../views/partials"),
    defaultLayout: 'layout',
    extname: 'hbs'
}));
server.set('view engine', 'hbs');
server.set('views', path.join(__dirname, "/../views"));

server.use(authRouter);


const PORT = process.env.PORT || 8080;
server.listen(PORT, ()=>{
  console.log(`Server is listening on http://localhost:${PORT}`);
});
