var express = require('express');
var router = express.Router();
const passport = require('passport')

/* GET users listing. */
router.get('/sign-in', function(req, res, next) {

  res.send('respond with a resource');
});
router.post('/sign-in', function (req, res, next) {
  passport.authenticate('local-user', function (err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      console.log('User not exist')
      return res.render('login')
    } else {
      req.logIn(user, function (err) {
        if (err) {
          return next(err)
        }
        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err => {
          console.log(err)
          if (req.isAuthenticated()) {
           return res.sendStatus(200);
          }
          console.log('user not exist')
          return res.redirect('/sign-in');
        })
      })
    }})(req, res, next)
})


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    req.isLogged = true
    return next();
  }
  else{
    req.isLogged = false
    return next()
  }
}
module.exports = isLoggedIn
module.exports = router;
