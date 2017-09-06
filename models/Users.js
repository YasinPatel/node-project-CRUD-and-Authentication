var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
     local: {
       email_id     : String,
       password     : String,
     },
     facebook         : {
       id           : String,
       token        : String,
       email_id     : String,
       name         : String
     },
     twitter          : {
       id           : String,
       token        : String,
       displayName  : String,
       username     : String
     },
     google           : {
       id           : String,
       token        : String,
       email_id     : String,
       name         : String
     },
     linkedin          : {
       id           : String,
       token        : String,
       displayName  : String,
     },
     github          : {
       id           : String,
       token        : String,
       displayName  : String,
       profileUrl   : String,
       username     : String,
       email_id     : String,
     },
}, { collection: 'user_master' });


// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
