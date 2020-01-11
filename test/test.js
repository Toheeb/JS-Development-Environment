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

