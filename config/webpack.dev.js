const path = require('path');

module.exports = {
  entry:{
    main: "./src/main.js"
  },
  mode:"development",
  output:{
    filename: "[name]-bundle.js", //[name] - taken from main in entry
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devServer: {
    contentBase: "dist"
  },
  module: {
    rules: [
      {
        test:/\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      }
    ]
  }
}
