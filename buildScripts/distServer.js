// This is not for production use
// It is just to See how Distribution will look like

import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(express.static('dist'));

// Use compression to see file Size that will be sent over wire
// Enable GZIP
app.use(compression());

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/users', function(req, res) {
  // Hard coding for simplicity
  res.json([
    {"id": 1, "firstName": "Bor", "lastName":"Smith", "email": "bob@gmail.com"},
    {"id": 2, "firstName": "Tammy", "lastName":"Norton", "email": "tnorton@gmail.com"},
    {"id": 3, "firstName": "Tina", "lastName":"Lee", "email": "lee.tina@gmail.com"}
  ]);
});


app.listen(port, function(err){
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
})
