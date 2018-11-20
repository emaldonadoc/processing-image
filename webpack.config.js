const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    disableHostCheck: true,
    compress: false,
    port: 3031,
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.css' }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
};