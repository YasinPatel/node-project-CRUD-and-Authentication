var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema  Employee
var employeeSchema = new Schema({
  name: String,
  contact_no: String,
  email_id: { type: String },
  created_at: Date,
  updated_at: Date
},{collection:'employee_master'});

// on every save, add the date
employeeSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

var Employee = mongoose.model('Employee', employeeSchema);

// make this available to our users in our Node applications
module.exports = Employee;
