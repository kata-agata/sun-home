const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = env => {
  return {
    entry:{
      main: [
        "./src/main.js"]
    },
    mode:"production",
    devtool: 'source-map',
    output:{
      filename: "[name]-bundle.js", //[name] - taken from main in entry
      path: path.resolve(__dirname, "../dist"),
      publicPath: "/"
    //  sourceMapFilename: "[name].js.map"
    },
  //  devtool: "source-map",
    module: {
      rules: [
        // {
        //   test: /\.css$/,
        //   use: [
        //     { loader: "style-loader" },
        //     { loader: "css-loader" }
        //   ]
        // },
        {
          test: /\.scss$/,
          use: [
            { loader: MiniCSSExtractPlugin.loader },
            { loader: "css-loader",
              // options: {
              //   modules: {
              //     localIdentName: "[path][name]__[local]"
              //   },
              // }
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
                  //name: 'images/[name]-[hash:8].[ext]',
                  name: 'images/[name].[ext]',
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
        // {
        //   test: /\.hbs$/,
        //   use: [
        //     {
        //       loader: "handlebars-loader",
        //       query: { inlineRequires: "/images/"}
        //     }
        //   ]
        // },
        { test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'file-loader?name=fonts/[name].[ext]' }
      ]
    },
    plugins: [
      new MiniCSSExtractPlugin({
        filename: "[name].css"
      }),
      // new HtmlWebpackPlugin({
      //   //template: "./src/views/index.hbs",
      //   title: "Sun-home"
      // }),
      new webpack.DefinePlugin({
        'process.env':{
          NODE_ENV: JSON.stringify(env.NODE_ENV)
        }
      }),
      new OptimizeCssAssetsPlugin(),
      new MinifyPlugin(),
    ],

  }
}
