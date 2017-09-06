const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

var Employee = require('../models/Employee');

// index page of employees
app.get('/',isLoggedIn,function(req,res){
  Employee.find({},function(err,employees){
    if (err) throw err;
    res.render('employee/index.ejs', {employees: employees})
  });
});

// add page of employees
app.get('/add',isLoggedIn,function(req,res){
  res.render('employee/add.ejs')
});

// add page of employees
app.post('/add',isLoggedIn,(req,res) => {
  var body = req.body;
  var user = new Employee(req.body);

  user.save(function(err) {
    if (err) throw err;
  });
  res.redirect('/employee')
});

// update page of employees
app.get('/update/:id',isLoggedIn,function(req,res){
    Employee.findById(req.params.id, function(err, employee) {
     if (err)
         res.send(err);
     res.render('employee/update.ejs', {employee: employee})
     });
});

//update employee data
app.post('/update/:id',isLoggedIn,function(req,res){
  Employee.findById(req.params.id, function(err, employee) {
     if (err)
         res.send(err);

    employee.name=req.body.name;
    employee.email_id=req.body.email_id;

    employee.save(function(err){
      if (err) throw err;
    })
    res.redirect('/employee')
   });
});

// view employee data
app.get('/:id',isLoggedIn,function(req,res){
    Employee.findById(req.params.id, function(err, employee) {
      if (err)
          res.send(err);
      res.render('employee/view.ejs', {employee: employee})
     });
});


// delete employee data
app.post('/del/:id',isLoggedIn,function(req,res){

  Employee.remove({
    _id: req.params.id
  },function(err){
    if (err)
        res.send(err);
  });

  // 2nd way
  // Employee.findByIdAndRemove(req.params.id, function(err) {
  //   if (err) throw err;
  // });

  res.redirect('/employee')
});
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/signin');
}

module.exports = app
