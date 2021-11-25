var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.redirect('/login')
  }
  else{
    res.render('register',{"regErr" : req.session.regErr,"emailErr" : req.session.emailErr, "nullErr" : req.session.regNullErr})
    req.session.regErr = false
    req.session.emailErr = false
    req.session.regNullErr = false
  }
});





module.exports = router;
