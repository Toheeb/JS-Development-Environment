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

const element = document.createElement('div');
element.className = 'btn';
element.innerHTML = 'Hello World';

element.onclick = () => import('./lazy' /* webpackChunkName: 'lazy' */).then((lazy) => {
  element.textContent = lazy.default;
}).catch((err) => {
  console.log(err);
});

document.body.appendChild(element);
