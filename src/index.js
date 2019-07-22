// This is the application entry point configured for Webpack

// Webpack should parse our stylesheet and use JS to inject it onto the page
import './index.css';

import numeral from 'numeral';

const courseValue = numeral(2000).format('$0,0.00');
console.log(`I would pay ${courseValue} for this awesome course!`); // eslint-disable-line no-console
