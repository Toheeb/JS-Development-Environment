// This file isn't transpiled. So use CommonJS and Es5

// Register babel to transpile before our tests run
require('babel-register');

// Disable webpack features that Mocha doesn't understand
require.extensions['.css'] = function () {};
