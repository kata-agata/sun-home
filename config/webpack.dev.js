const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:{
    main: "./src/main.js"
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
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
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
            query: { inlineRequires: "/images/"}
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.hbs",
      title: "Sun-home"
    }),

  ]
}
