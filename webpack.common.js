const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const starkit = require('./starkit.json');
const marked = require('marked');
const frontMatter = require('front-matter');
const fs = require('fs');


module.exports = env => {

  if (starkit.htmlPages === undefined || !Array.isArray(starkit.htmlPages)) {
    console.log('Nothing')
    return commonConfig;
  }

  starkit.htmlPages.forEach(page => {
    const extension = path.extname(page);

    const options = {
      hash: true,
      filename: page,
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        removeComments: true,
      }
    }

    if (extension === '.md') {

      options.template = './src/theme/index.pug';

      const file = frontMatter(fs.readFileSync(`./src/${page}`, 'utf-8'));

      options.templateParameters = {
        markdown: marked(file.body),
        fmAttributes: file.attributes
      }

      options.filename = path.basename(page, extension) + '.html';

    }

    commonConfig.plugins.push(
      new HtmlWebpackPlugin(options)
    )
  });

  return commonConfig;
}

const commonConfig = {
  entry: {
    theme:  `./src/${starkit.entry}`
  },

  output: {
    filename: "assets/js/[name].[chunkHash].js",
    chunkFilename: 'assets/js/[name].[chunkHash].js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "eslint-loader"
        ]
      },
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.pug$/,
        use: ['pug-loader']
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),

  ]
}

// new HtmlWebpackPlugin({
//   hash: true,
//   filename: 'index.html',
//   template: './src/index.html',
//   title: "Toheeb's Blog",
//   toheeb: 'Custom for Toheeb',
//   minify: {
//     collapseInlineTagWhitespace: true,
//     collapseWhitespace: true,
//     removeComments: true,
//   }
// }),
