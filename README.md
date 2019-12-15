# JS-Development-Environment
A starter kit for web development using the following languages:
- HTML
- CSS
- Javascript

NB: The kit leverages on the use of NPM packages hence the need of Node v8 and its package manager -NPM

## Table of Content
The starter kit helps to:
- [Enforce settings across editors](#enforce-settings-across-editors)
- [Bundle JS Files](#bundle-js-files)

### Enforce settings across editors
The following settings are enforced on Code Editors that will be used for this project files.
This is done through [Editor Config](editorconfig.org)
- 4 spaces as indent size and style; 
- UTF-8 character set
- End Of Lines being trailed of spaces (except markdown files), ended with line feed, and a new one insterted at the end of file
- Force hard line wrapping after 75 characters for editors that supports it.
See [EditorConfig Properties](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties)

### Bundle JS Files
[Web[ack](https://webpack.js.org/) is configured to bundle JS files (and its dependency graph) into one for distribution on the web
