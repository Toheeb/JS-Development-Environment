import './style.css';

const dependency = require('./dependency');

console.log('Logging from index.js');
console.log(dependency.message);

var array = [1,2,3];

Array.from(array).forEach(($item) => {
 console.log($item);
})
