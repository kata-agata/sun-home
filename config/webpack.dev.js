const path = require('path');

module.exports = {
  entry:{
    main: "./src/main.js"
  },
  mode:"development",
  output:{
    filename: "[name]-bundle.js", //[name] - taken from main in entry
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    sourceMapFilename: "[name].js.map"
  },
  devtool: "source-map",
  devServer: {
    contentBase: "dist",
    overlay: true
  },
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
          {
            loader: "file-loader",
            options: {
              name: "[name].html"
            }
          },
          { loader: "extract-loader"},
          { loader: "html-loader" }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          "file-loader"
        ]
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
      }

    ]
  }
}
