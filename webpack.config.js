const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/app.js',
  output : {
    path: path.resolve(__dirname + '/dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","sass-loader"],
          publicPath: '/dist'

        })
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    stats: "errors-only",
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React-Webpack App',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      template: './src/index.html', 
    }),
    new ExtractTextPlugin({
       filename: 'style.css'
    })   
  ]
}