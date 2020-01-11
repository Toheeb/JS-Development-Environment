const test = require('tape');
const fs = require('fs');

let actual, expected, message;


test('Package files exist?', assert => {

  const files = ['package.json', '.gitignore', '.editorconfig'];

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
})

test('Editor Configuration', assert => {
  const editorconfig = require('editorconfig').parseSync('./.editorconfig');

  actual = true;
  expected = Number.isInteger(editorconfig.indent_size);
  message = 'Indentation size should be declared as a number';

  assert.deepEqual(actual, expected, message);
  assert.end();
})
