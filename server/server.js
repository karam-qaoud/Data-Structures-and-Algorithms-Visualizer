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
  const { email, first_name, last_name, password } = req.body;
  if (!email || !first_name || !last_name || !password) {
    return res.status(400).send('Please fill out all required fields.');
  }
  const newUser = new userModel({
    email,
    first_name,
    last_name,
    password,
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

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email, password }, (err, result) => {
    if (err) throw err;
    if (result) {
      res.send(`Welcome, ${result.first_name}!`);
    } else {
      res.status(401).send('Invalid email or password.');
    }
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
