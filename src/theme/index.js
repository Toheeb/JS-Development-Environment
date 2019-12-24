import './style.scss';


/* eslint-disable no-console */
const dependency = require('./dependency');

console.log('Logging from index.js');
console.log(dependency.message);

const array = [1, 2, 3];

Array.from(array).forEach(($item) => {
  console.log($item);
});
