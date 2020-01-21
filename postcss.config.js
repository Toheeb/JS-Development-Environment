const PostcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    new PostcssPresetEnv({
      stage: 3
    })
  ]
}
