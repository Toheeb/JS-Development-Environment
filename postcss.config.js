const postcssPresetEnv = require('postcss-preset-env');
const StyleLintPlugin = require('stylelint');
const bemLinter = require('postcss-bem-linter');
const reporter = require('postcss-reporter');
const cssnano = require('cssnano');

module.exports = {
    plugins: [
        new StyleLintPlugin({
        }),
        postcssPresetEnv({
            stage: 3
        }),
        bemLinter({
            preset: 'bem'
        }),
        reporter({
            clearReportedMessages: true
        }),
        cssnano({})
    ]
}
