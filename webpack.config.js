const path = require('path');


module.exports = env => {

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
    }
  }
}
