# JS-Development-Environment
A starter kit for web development using the following languages:
- HTML
- CSS
- Javascript

NB: The kit leverages on the use of NPM packages hence the need of Node v8 and its package manager -NPM

## Table of Content
The starter kit helps to:
- [Enforce settings across editors](#enforce-settings-across-editors)
- [Bundle Files](#bundle-files)
- [Support](#supports)
- [Automate Tasks](#automate-tasks)
- [Enforce JS Style Guides](#enforce-js-style-guides)

### Enforce settings across editors
The following settings are enforced on Code Editors that will be used for this project files.
This is done through [Editor Config](editorconfig.org)
- 4 spaces as indent size and style; 
- UTF-8 character set
- End Of Lines being trailed of spaces (except markdown files), ended with line feed, and a new one insterted at the end of file
- Force hard line wrapping after 75 characters for editors that supports it.
See [EditorConfig Properties](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties)

### Bundle Files
- [Webpack](https://webpack.js.org/) is configured to bundle JS files (and its dependency graph) into one for distribution on the web
- Mini CSS Extract Plugin and CSS loader are integrated into webpack to allow for bundling of stylesheet into their own files in the distribution directory
- Support for Sass Files using node-sass and sass-loader of webpack
- Supports Multiple Page Apps using Multiple entries and HTML Webpack Plugin

### Supports
- Latest JS Features. This is done by using [Babel](https://babeljs.io) to transpile JS syntax to es5. Polyfilling is done with the use of [CoreJS](https://github.com/zloirock/core-js)
- Images (.png, .jpg, .gif, .svg)

### Automate Tasks
Task automation is done with NPM Scripts. Example:
- To Build the app for development use ```npm run build:dev```; or production, use ```npm run build:prod```

### Enforce JS Style Guides
- To ensure consistency and best practices [AirBnB Javascript Style Guide](https://github.com/airbnb/javascript/blob/master/README.md)
