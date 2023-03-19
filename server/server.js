const express = require('express');
var cors = require('cors');

const database = require('../database/database.js');
const userModel = database.userModel;
const app = express();
const port = 8080;

// parse application/x-www-form-urlencoded
app.use(cors());
app.use(express.json());

app.post('/signup', (req, res) => {
  
  const newUser = new userModel({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  });
  newUser
    .save()
    .then((result) => {
      console.log(result);
      res.send('Signed up a new user!');
    })
    .catch((err) => {
      res.send('Some error happened, user was not registered!');
    });
});

app.get('/signup', (req, res) => {
  console.log(req.data);

  res.send('Successful get request!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
