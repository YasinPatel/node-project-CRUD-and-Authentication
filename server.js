const express = require('express')
const bodyParser= require('body-parser')
const serverapp = express()
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

serverapp.use(bodyParser.urlencoded({extended: true}))
serverapp.set('view engine', 'ejs') // get information from html forms

// set up our express application
serverapp.use(morgan('dev')); // log every request to the console
serverapp.use(cookieParser()); // read cookies (needed for auth)

serverapp.use(session({
    secret: 'cookie_secret',
    // store: new MemoryStore(),
    name: 'cookie_name',
    // proxy: true,
    expires: new Date(Date.now() + (30 * 86400 * 1000)),
    maxAge: Date.now() + (30 * 86400 * 1000),
    resave: true,
    saveUninitialized: true
}));
serverapp.use(passport.initialize());
serverapp.use(passport.session()); // persistent login sessions
serverapp.use(flash()); // use connect-flash for flash messages stored in session

var employee = require(__dirname +'/controllers/EmployeeController');

require(__dirname +'/controllers/RouteController')(serverapp, passport); // load our routes and pass in our app and fully configured passport
var url = 'mongodb://localhost/test2DB';
mongoose.connect(url,{ useMongoClient: true });

require('./config/passport')(passport); // pass passport for configuration

serverapp.get('/',function(req,res) // home page
{
  res.sendFile(__dirname + '/views/index.html')
});

serverapp.use('/employee', employee)

serverapp.get('*',function(req,res) // 404 page
{
  res.sendFile(__dirname + '/views/404.html')
});

var server = serverapp.listen(8081, function (req,res) {
  console.log("working");
})
