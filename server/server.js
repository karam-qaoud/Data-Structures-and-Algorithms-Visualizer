const express = require('express');
const database = require('../database/database.js');
const app = express();
const port = 8080;

app.get('/signup', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
