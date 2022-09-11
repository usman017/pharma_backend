const express = require('express');
const router = express.Router()

router.get('/dashboard', (req, res, done) => {
  res.send();
})

module.exports = router