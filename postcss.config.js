const PostcssPresetEnv = require('postcss-preset-env');
const CssNano = require('cssnano');

module.exports = {
  plugins: [
    new PostcssPresetEnv({
      stage: 3
    }),
    new CssNano({
      preset: 'default'
    })
  ]
}
