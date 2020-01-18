const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const smp = new SpeedMeasureWebpackPlugin();


module.exports = (env, argv) => {

  const config = getConfig(env, argv);

  if (env && env.speed) {
    return smp.wrap(config);
  }

  return config;
}


function getConfig(env, argv) {

  const testMode = env && env.testFile;
  const settings = testMode ? require('./test/.starkitrc.json') : require('./.starkitrc.json');

  let htmlFile = '';
  let htmlWebpackOptions = {};

  if (testMode) {
    htmlFile = path.resolve(__dirname, 'test/test-file/index.pug');
  }

  const fileExtension = path.extname(htmlFile);

  // Doesn't cater for cases with file not available
  if (fileExtension == '.pug') {
    htmlWebpackOptions = {
      template: 'pug-loader!' + htmlFile,
    }
  } else if (fileExtension == '.html') {
    htmlWebpackOptions = {
      template: htmlFile
    }
  }

  if (argv.mode === 'production') {
    htmlWebpackOptions['minify'] = {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    }
  }

  return {

    mode: argv.mode === 'production' ? 'production' : 'development',

    context: path.resolve(__dirname, settings.developmentDir),
    entry: settings.entry,

    output: {
      path: path.resolve(__dirname, settings.productionDir)
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ]
        }
      ]
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(htmlWebpackOptions)
    ]
  }
}
