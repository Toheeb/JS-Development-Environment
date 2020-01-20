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

  const mode = argv.mode;
  const testMode = env && env.testFile;
  const settings = testMode ? require('./test/.starkitrc.json') : require('./.starkitrc.json');
  const htmlPagePlugins = getHtmlPages(settings, mode);

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
      ...htmlPagePlugins
    ]
  }
}


function getHtmlPages({htmlPages = {}}, mode) {
  const filenames = Object.keys(htmlPages);

  return filenames.map(filename => {
    const extension = path.extname(filename);
    if (extension !== '.html') {
      console.log('Error: ')
      console.log(`The file type "${extension}" is not supported in htmlPages: .starkitrc.json`);
      process.exit(1);
    }
    const {chunks} = htmlPages[filename];

    return new HtmlWebpackPlugin({
      filename: filename,
      chunks: chunks,
      template: filename,
      minify: (mode === 'production') ? {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      } : false
    })
  });
}
