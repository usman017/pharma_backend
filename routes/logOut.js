const express = require('express')
const router = express.Router()

router.post("/logout", (req, res) => {

  req.logout();
  req.session.destroy((err) => {
    if (err) {console.log(err)}
    res.clearCookie('connect.sid');
    // Don't redirect, just print text
    res.sendStatus(200);
  });
  
})

module.exports = router