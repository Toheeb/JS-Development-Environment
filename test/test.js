const test = require('tape');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const testFile = path.resolve(__dirname, 'test-file/index.js');
const bundledFile = path.resolve(__dirname, 'bin/main.js');
const bundledHTMLFile = path.resolve(__dirname, 'bin/index.html');
const { JSDOM } = require('jsdom');

let actual, expected, message;


test('Package files exist?', assert => {

  const files = [
    'package.json', '.gitignore', '.editorconfig', 'webpack.config.js',
    '.eslintrc.js', '.babelrc', '.browserslistrc'
  ];

  actual = true;
  message = 'All files exist';

  expected = files.every(file => {
    if (fs.existsSync(file)) {
      return true;
    }
    message = `${file} does not exists. There may be others too!`;
    return false;
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Editor Configuration', assert => {
  const editorconfig = require('editorconfig').parseSync('./.editorconfig');

  actual = true;
  expected = Number.isInteger(editorconfig.indent_size);
  message = 'Indentation size should be declared as a number';

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Bundling of Files', assert => {
  assert.plan(6);

  exec(`npm run build:prod -- --env.testFile=${testFile}`, (err, stdout, stderr) => {
    actual = true;
    expected = err ? false : true;
    message = 'Bundling should be successful';

    assert.deepEqual(actual, expected, message);

    fs.readFile(bundledFile, 'utf-8', (err, data) => {

      message = 'Should transpile const to var';
      actual = true;
      expected = false;

      if (!err && data.indexOf('const ') === -1) {
        expected = true;
      }

      assert.deepEqual(actual, expected, message);

      message = 'Minification should not include comments in production';
      actual = true;
      expected = (!err && data.indexOf('// Testing Dynamic Imports') === -1) ? true : false;

      assert.deepEqual(actual, expected, message);
    });

    fs.readFile(bundledHTMLFile, 'utf-8', (err, data) => {

      const isValidHtml = (!err && data.trim().endsWith('</body></html>')) ? true : false;

      message = 'Can generate valid html pages';
      actual = true;
      expected = isValidHtml;

      assert.deepEqual(actual, expected, message);

      message = 'Minification of html pages should not include comments in production';
      actual = true;
      expected = (isValidHtml && data.indexOf('<!-- Testing Minification with comments -->') === -1) ? true : false;

      assert.deepEqual(actual, expected, message);

    })

    JSDOM.fromFile(bundledHTMLFile, {resources: 'usable', runScripts: 'dangerously'}).then(dom => {
      setTimeout(() => {
        global.document = dom.window.document;

        const h1BeforeButtonClick = document.querySelector('h1').textContent.trim() === '' ? true : false;
        document.querySelector('button').click();

        setTimeout(() => {
          const h1AfterButtonClick = document.querySelector('h1').textContent.trim() === 'Heading One' ? true : false;

          message = 'Dynamic import of scripts should work';
          actual = true;
          expected = h1BeforeButtonClick && h1AfterButtonClick;

          assert.deepEqual(actual, expected, message);
        }, 5000, h1BeforeButtonClick, document)
      }, 5000)
    }).catch(err => console.log(err));
  });
});

test('Linting', assert => {
  const lint = require('../.eslintrc.js');
  const editorconfig = require('editorconfig').parseSync('./.editorconfig');

  actual = editorconfig.indent_size;
  expected = (lint && lint.rules && lint.rules.indent) ? lint.rules.indent[1] : false;
  message = 'Linting and Editorconfig should have the same indentation size, explicitly set'

  assert.deepEqual(actual, expected, message);

  exec(`npx esw ${testFile}`, (err, stdout, stderr) => {
    actual = true;
    expected = stderr ? true : false;
    message = `Linter should throw error(s) & warning(s) because of console.log statement and a missing semicolon in line 1 of test/test-file/index.js`;

    assert.deepEqual(actual, expected, message);
  });

  assert.end();
})
