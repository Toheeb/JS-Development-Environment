const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const md = require('markdown-it')('commonmark');
const frontmatter = require('front-matter');

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


function getHtmlPages({htmlPages = {}, developmentDir}, mode) {
  const filenames = Object.keys(htmlPages);

  return filenames.map(filename => {
    const extension = path.extname(filename);
    if (['.html', '.md'].includes(extension) === false) {
      console.log('Error: ')
      console.log(`The file type "${extension}" is not supported in htmlPages: .starkitrc.json`);
      process.exit(1);
    }
    const {chunks} = htmlPages[filename];

    const options = {
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
    };

    if (extension === '.md') {
      const mdFile = fs.readFileSync(path.resolve(__dirname, developmentDir, `${filename}`), 'utf-8')
      const markdownOptions = frontmatter(mdFile);
      options['filename'] = `${filename.slice(0, (extension.length * -1))}.html`;
      options['template'] = `pug-loader!${path.resolve(__dirname, developmentDir, htmlPages[filename]['template'])}`;
      options['templateParameters'] = {
        marked: md.render(markdownOptions.body),
        ...markdownOptions.attributes
      }
    }

    return new HtmlWebpackPlugin(options);
  });
}
