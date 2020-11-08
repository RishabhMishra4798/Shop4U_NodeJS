var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
async = require('async');

var userSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String,
    bcrypt: true
  },
  contact: {
    type: String
  }
});

var User = module.exports = mongoose.model('User',userSchema);

// Get User By Id
User.getUserById = (id, callback) => {
  User.findById(id, callback);
}

// Get User By Email
User.getUserByEmail = (email, callback) => {
  var query = {email: email};
  User.findOne(query, callback);
}

// Compare Password
User.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
    if(err) throw err;
    callback(null,isMatch);
  })
}

// Create User
User.saveUser = (newUser, callback) => {
  bcrypt.hash(newUser.password, 10, (err,hash)=>{
    if(err) throw err
    // Set Hash
    newUser.password = hash;
    console.log("User is being saved.");
    async.parallel([()=>newUser.save()],callback);
  })
}
