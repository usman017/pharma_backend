var express = require('express');
var router = express.Router();
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

/* GET home page. */

router.get('/user/sign-up', function(req, res, next) {
  res.json();
});

router.post('/user/sign-up', (req, res) => {
 
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  })

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        res.status(500).json({ error: err});
      } else{
        newUser.password = hash;
        newUser.save()
          .then(data => {
            res.sendStatus(200);
          })
          .catch((err) => {
            res.sendStatus(500);
          })
      }
    })
  })
})
module.exports = router;
