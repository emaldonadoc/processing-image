module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.bundle.js',
    library: 'app',
    path: path.join(__dirname, 'dist'),
    publicPath: './dist/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: './dist/',
    compress: false, 
    port: 3031
  },
};