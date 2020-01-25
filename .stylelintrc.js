const editorconfig = require('editorconfig').parseSync('./.editorconfig');

module.exports = {
    "extends": "stylelint-config-standard",
    "plugins": [
      "stylelint-selector-bem-pattern",
      "stylelint-no-unsupported-browser-features"
    ],
    "rules": {
      "indentation": editorconfig.indent_size || 2,
      "max-line-length": editorconfig.max_line_length || 80,
      "plugin/selector-bem-pattern": {
        "preset": "bem"
      },
      "plugin/no-unsupported-browser-features": [true, {
        "severity": "warning"
      }],
    }
}
