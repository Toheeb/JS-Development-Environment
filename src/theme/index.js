import './style.scss';
import myImage from '../assets/image/Toheeb.jpg';

/* eslint-disable no-console */
const dependency = require('./dependency');

console.log('Logging from index.js');
console.log(dependency.message);

const array = [1, 2, 3];

Array.from(array).forEach(($item) => {
  console.log($item);
});

document.querySelector('#jsImage').src = myImage;
