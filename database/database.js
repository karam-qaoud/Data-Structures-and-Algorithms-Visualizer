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
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
});

let userModel = mongoose.model('users', userSchema);

module.exports.userModel = userModel;
