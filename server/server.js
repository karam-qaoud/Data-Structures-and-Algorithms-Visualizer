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
      console.log('Some error happened, user was not registered!');
      if (err.code === 11000 && err.keyPattern.email) {
        // If the error is caused by a duplicate email, return an error message
        res.status(400).send('User with this email already exists!');
      } else {
        // If the error is caused by some other reason, return a generic error message
        res.status(500).send('Some error happened, user was not registered!');
      }
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
