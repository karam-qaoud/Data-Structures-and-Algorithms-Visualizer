const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb://localhost:27017/DataStrucutresAndAlgorithmsVisualizerDatabase',

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('connected to dataBase');
  })
  .catch((err) => {
    console.log(err);
  });

let userSchema = new mongoose.Schema({
  id: Number,
  email: String,
  first_name: String,
  last_name: String,
  password: String,
});

let userModel = mongoose.model('users', userSchema);

module.exports.userModel = userModel;
