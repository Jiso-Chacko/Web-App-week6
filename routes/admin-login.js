const { response } = require('express');
var express = require('express');
var router = express.Router();
var userAddhelper = require('../helpers/userAddhelpers')

/* GET users listing. */
router.get('/', function(req, res, next) {

  if(req.session.admin){
    userAddhelper.getAllUsers().then((users)=>{
      res.render('adminhome',{users,admin:true})
    })
  }
  else{
    res.render('adminlogin',{"adminLoginErr": req.session.adminLoginErr})
    req.session.adminLoginErr = false;
  }
});

router.post('/',(req,res)=>{
  console.log("This is admin-log");
  // console.log(req.body);
  var response = admiDoLogin(req.body)
  if(response.status){
    // console.log("Admin logged in");
    req.session.admin = response.admin
    userAddhelper.getAllUsers().then((users)=>{
      res.redirect('/admin')
    })
  }
  else{
    console.log("Admin log failed");
    req.session.admin = null;
    req.session.status =  false;
    req.session.adminLoginErr = "Admin login failed";
    res.redirect('/adminlogin')
  }
    
})


function admiDoLogin(loginDatas){
  const loginUsername=loginDatas.username;
  const loginPassword=loginDatas.Password;
  var response={}

  var admin = {username: "jiso", Password:'12345'}
  if(admin.username === loginUsername && admin.Password === loginPassword){
    // console.log('Login Success');
    response.admin = admin;
    response.status=true;
  }
  else{
    console.log('Login Failed');
    response.admin = null;
    response.status = false;
  }
  return response;
}

router.get('/adminlogout',(req,res)=>{
  console.log("Admin logout router");

  req.session.admin = null 
  res.redirect('/adminlogin')
})

module.exports = router;
