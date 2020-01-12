const test = require('tape');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const testFile = path.resolve(__dirname, 'test-file/index.js');

let actual, expected, message;


test('Package files exist?', assert => {

  const files = [
    'package.json', '.gitignore', '.editorconfig', 'webpack.config.js',
    '.eslintrc.js'
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
  exec(`npm run build -- --env.testFile=${testFile}`, (err, stdout, stderr) => {
    actual = true;
    expected = err ? false : true;
    message = 'Bundling should be successful';

    assert.deepEqual(actual, expected, message);
    assert.end();
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

