const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
module.exports = function(passport) {
  passport.use('local-user',
    new LocalStrategy({usernameField: 'email'}, function(email, password, done) {
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, ({ message: "Email or Password does't exist "}))
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              return res.status(500).json({ error: err});
            } else if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, ({message: 'Password incorrect'}))
            }
          })
        })
        .catch(error => {
          return res.status(500).json({ error: error});
        })
    }
  ))

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user.id);
    });
  });
  
  passport.deserializeUser(function(id, cb) {
    db.get('SELECT * FROM users WHERE id = ?', [ id ], function(err, user) {
      if (err) { return cb(err); }
      return cb(null, user);
    });
  });
} 