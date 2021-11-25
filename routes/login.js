var express = require('express');
var router = express.Router();
var userAddhelper = require('../helpers/userAddhelpers')
var registerUserhelpers = require('../helpers/registerUserhelpers')

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.session.user) {
    res.redirect('/')
  } 
  else {
    res.render('login', {"Loginerr" : req.session.userLoginErr,"succMess" : req.session.succMess,"blockMessage" : req.session.blockMessage, "loginNullErr" : req.session.loginNullErr})
    req.session.loginNullErr = false
    req.session.userLoginErr = false;
    req.session.succMess = false;
    req.session.blockMessage = false;
  }
});

router.post('/', function (req, res, next) {
  console.log(req.body);
  if(req.body.name === '' || req.body.email === '' || req.body.password === ''){
    req.session.regNullErr = true
    res.redirect('/register')
  }
  else{
    if (req.session.user) {
      res.redirect('/')
    } 
    else {
      // console.log(req.body);
      // sample code starts
      if(req.body.password[0] != req.body.password[1]){
        req.session.regErr = "Password doesn't match"
        res.redirect('/register')
      }else{
        registerUserhelpers.doRegister(req.body).then((response) => {
  
          if(response.status){
            req.session.loggedIn = true
            req.session.user = response.user
            req.session.succMess = "Now please login" 
            res.redirect('/login')
          }
          else{
            req.session.emailErr = "User Already exists"
            res.redirect('/register')
          }
        })
      }
  }
  

    // sample code ends



    // registerUserhelpers.doRegister(req.body).then((response) => {
    //   console.log('Entered');
    //   console.log(response.status);
    //   if (req.body.password[0] === req.body.password[1] && response.status) {
    //     req.session.loggedIn = true
    //     req.session.user = response.user
    //     res.redirect('/login')
    //   } else {
    //     if (req.body.password[0] != req.body.password[1]) {
    //       req.session.regErr = "Password doesn't match"
    //       res.redirect('/register')
    //     } else if (req.body.password[0] === req.body.password[1] && response.status) {
    //       req.session.regErr = "Password doesn't match"
    //       req.session.emailErr = "User Already exists"
    //       res.redirect('/register')
    //     } else {
    //       req.session.emailErr = "User Already exists"
    //       res.redirect('/register')
    //     }

    //   }

    // })

  }
});






module.exports = router;