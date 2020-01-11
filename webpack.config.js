const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasureWebpackPlugin();


module.exports = env => {

  const config = getConfig(env);

  if (env && env.speed) {
    return smp.wrap(config);
  }

  return config;
}


function getConfig(env) {
  let mainEntryFile = path.resolve(__dirname, 'src/index.js');
  let outputPath = path.resolve(__dirname, 'dist');

  if (env && env.testFile) {
    mainEntryFile = env.testFile;
    outputPath = path.resolve(__dirname, 'test/bin');
  }

  return {

    mode: 'development',

    entry: {
      main: mainEntryFile
    },

    output: {
      filename: "[name].js",
      path: outputPath
    },

    plugins: [
      new CleanWebpackPlugin()
    ]
  }
}
