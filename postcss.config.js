module.exports = {
  plugins: [
    require('precss'),
    require('autoprefixer')({browsers: ['last 10 versions']}),
  ]
}
