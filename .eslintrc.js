const editorconfig = require('editorconfig').parseSync('./.editorconfig');

module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "allowImportExportEverywhere": true
    },
    "rules": {
        "indent": ["error", editorconfig.indent_size || 2],
        "max-len": ["error", {"code": editorconfig.max_line_length || 80}]
    }
}
