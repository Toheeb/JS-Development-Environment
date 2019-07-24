import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,        // Display list of files that are bundling
  entry: {
    "vendor": path.resolve(__dirname, 'src/vendor'),
    "main": path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    // Generate CSS File for production build
    // with a hash in its name hence cache bundlind is enabled
    new ExtractTextPlugin('[name].[contenthash].css'),

    // Hash the files using MD5 so that their names change when the content changes
    new WebpackMd5Hash(),
    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so they are cached separately
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    // Dynamically create HTML file that includes reference to bundled JS
    //
    // Note that any property defined here will be available in the file (index.html)
    // specified by template
    // These variables can be accessed by Inbuilt Template Engine in Webpack called ejs
    // This logic can be used to dynamically load content for production in html files
    //
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),

    // Minify JS
    new webpack.optimize.UglifyJsPlugin(),

    // Eliminate duplicate packages
    new webpack.optimize.DedupePlugin()
  ],
  module: {

    // file types we want to handle
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
