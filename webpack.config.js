const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/App.js',
  output : {
    path: path.resolve(__dirname + '/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","sass-loader"],
          publicPath: './dist/'

        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=200000' },
			{
				test   : /vendor\/.+\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
			    loader : 'file-loader',
			    exclude: /node_modules/
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
    new ExtractTextPlugin({
       filename: 'style.css'
    })   
  ]
}