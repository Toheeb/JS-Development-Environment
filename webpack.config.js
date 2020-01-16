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
  let mainEntryFile = path.resolve(__dirname, 'src/index.js');
  let outputPath = path.resolve(__dirname, 'dist');
  let htmlWebpackOptions = {};

  // For loading dynamic assets. This should be the location of assets to the html file
  let publicPath = '/';

  if (env && env.testFile) {
    mainEntryFile = env.testFile;
    outputPath = path.resolve(__dirname, 'test/bin');
    publicPath =  '../bin/';
    htmlWebpackOptions = {
      template: path.resolve(__dirname, 'test/test-file/index.html')
    }
  }

  return {

    mode: argv.mode === 'production' ? 'production' : 'development',

    entry: {
      main: mainEntryFile
    },

    output: {
      filename: "[name].js",
      path: outputPath,
      publicPath: publicPath
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
