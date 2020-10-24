const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:{
    main: './src/main.js'
  },
  mode:"development",
  output:{
    filename: "[name]-bundle.js", //[name] - taken from main in entry
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  //  sourceMapFilename: "[name].js.map"
  },
  devServer: {
    contentBase: "dist",
    overlay: true,
    hot: true,
    stats:{
      colors:true
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]"
              },
            }
          },
          { loader: 'postcss-loader'},
          { loader: "sass-loader"}
        ]
      },
      {
        test: /\.html$/,
        use: [
          { loader: "html-loader" }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          esModule: false,
          name: 'images/[name]-[hash:8].[ext]',
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [ '@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: "handlebars-loader",
            query: {
              inlineRequires: "/images/",
              partialsDir: [
                path.join(__dirname, "/../src/views/partials")
              ],
              layoutsDir: [
                path.join(__dirname, "/../src/views/layouts")
              ]
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {}
      }
    }),
    new HtmlWebpackPlugin({
       filename: "index.html",
       template: './src/views/index.hbs',
       title: "Sun-home",
      //      chunks: ["main"]
    }),
  ]
}
