import './style.css';

console.log('Linter should throw warning for this console statement and error for missing semicolon')

// Testing Transpiling by changing the declaration
const changeConstToVar = true;

// Testing Dynamic Imports
const button = document.querySelector('#button');

if (button) {
  button.addEventListener('click', () => {
    import('./dependency').then(obj => {
      document.querySelector('h1').textContent = obj.h1;
    });
  });
}
