module.exports=function(app,passport){
  app.get('/signin', function(req, res) {
          // render the page and pass in any flash data if it exists
          res.render('login.ejs', { message: req.flash('loginMessage') });
      });
  // process the login form
   app.post('/signin', passport.authenticate('local-login', {
       successRedirect : '/employee', // redirect to the secure profile section
       failureRedirect : '/signin', // redirect back to the signup page if there is an error
       failureFlash : true // allow flash messages
   }));

  app.get('/signup', function(req, res) {
       // render the page and pass in any flash data if it exists
       res.render('signup.ejs', { message: req.flash('signupMessage') });
   });

 // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/employee', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

  //  app.get('/users', isLoggedIn, function(req, res) {
  //      res.render('index.ejs', {
  //          user : req.user // get the user out of session and pass to template
  //      });
  //  });

   app.get('/logout', function(req, res) {
         req.logout();
         res.redirect('/');
     });

     // =====================================
     // FACEBOOK ROUTES =====================
     // =====================================
     // route for facebook authentication and login
     app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

     // handle the callback after facebook has authenticated the user
     app.get('/auth/facebook/callback',
         passport.authenticate('facebook', {
             successRedirect : '/employee',
             failureRedirect : '/'
         }));


        // =====================================
       // TWITTER ROUTES ======================
       // =====================================
       // route for twitter authentication and login
       app.get('/auth/twitter', passport.authenticate('twitter'));

       // handle the callback after twitter has authenticated the user
       app.get('/auth/twitter/callback',
           passport.authenticate('twitter', {
               successRedirect : '/employee',
               failureRedirect : '/'
           }));

       // =====================================
       // GOOGLE ROUTES =======================
       // =====================================
       // send to google to do the authentication
       // profile gets us their basic information including their name
       // email gets their emails
       app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

       // the callback after google has authenticated the user
       app.get('/auth/google/callback',
               passport.authenticate('google', {
                       successRedirect : '/employee',
                       failureRedirect : '/'
               }));

       // =====================================
       // linkedin ROUTES =======================
       // =====================================

       app.get('/auth/linkedin', passport.authenticate('linkedin', { scope : ['r_basicprofile', 'r_emailaddress'] }));

       // the callback after google has authenticated the user
       app.get('/auth/linkedin/callback',
               passport.authenticate('linkedin', {
                       successRedirect : '/employee',
                       failureRedirect : '/'
               }));

       // =====================================
       // github ROUTES =======================
       // =====================================

       app.get('/auth/github', passport.authenticate('github', { scope : [ 'user:email' ] }));

       // the callback after google has authenticated the user
       app.get('/auth/github/callback',
               passport.authenticate('github', {
                       successRedirect : '/employee',
                       failureRedirect : '/'
               }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
