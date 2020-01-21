import './style.css';

console.log('From src/index.js');

const arr = [1, 2, 3];

Array.from(arr).forEach((item) => {
  console.log(item);
});

fetch('googl.com');
