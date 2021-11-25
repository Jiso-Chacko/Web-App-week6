var express = require('express');
var router = express.Router();
var userAddhelper = require('../helpers/userAddhelpers')
let searchUser = []
/* GET users listing. */
router.get('/', function(req, res, next) {

  if(req.session.admin){
    userAddhelper.getAllUsers().then((users)=>{
     
      res.render('adminhome',{users,admin:true ,searchUser, searchValue : req.session.currentValue, "enableMessg" : req.session.successMsg, blockStatus : req.session.disableStatus})
      req.session.disableStatus = false
      // console.log(blockStatus);
      // console.log("This is searchUser");
      // console.log(searchUser);
      // console.log(users);
      req.session.currentUser = null
      req.session.currentValue = false
    })
  }
  else{
    res.redirect('/adminlogin')
  }
});

router.get('/add-user',(req,res)=>{
    res.render('adduserform',{"addUsrErr" :  req.session.addUsrErr,"addEmptyUserErr" : req.session.addEmptyUserErr})
    req.session.addEmptyUserErr = false
    req.session.addUsrErr = false
})

router.post('/',(req,res)=>{
    
    console.log(req.body);
    if(req.body.name === '' || req.body.email === '' ||  req.body.password === ''){
        req.session.addEmptyUserErr = true;
        res.redirect('/admin/add-user')
    }
    else{

      userAddhelper.addUser(req.body).then((response)=>{
        console.log(response.status);
       if(response.status){
         userAddhelper.getAllUsers().then((users)=>{
           res.render('adminhome',{users,admin:true})
         })
       }
       else{
         req.session.addUsrErr = true
        res.redirect('/admin/add-user')
       }
        
      })
    }
})

router.post('/admin-log',(req,res)=>{
  console.log("This is admin-log");
  console.log(req.body);
  res.redirect('adminhome')
})

router.get('/delete-user',(req,res)=>{
  
  let userId = req.query.id;
  // console.log(userId);
  userAddhelper.deleteUser(userId).then((response)=>{
    res.redirect('/admin')
  })
})

router.get('/edit-user/',async (req,res)=>{
  // let editId = req.query.id
  
  
  let editUser = await userAddhelper.getUserData(req.query.id)
  console.log(editUser);
  res.render('editUser',{editUser, "editUserErr" : req.session.editUserErr})
  req.session.editUserErr = false
})

router.post('/edit-user/:id',(req,res)=>{
  console.log(req.body);
  if(req.body.name === '' || req.body.email === '' || req.body.password === ''){
    req.session.editUserErr = true
    console.log("This is edit user");
    res.redirect('/admin/edit-user?id=' + req.params.id)

  }
  else{
    userAddhelper.updateUser(req.params.id,req.body).then(() => {
      res.redirect('/admin')
    })
  }
})

router.get('/search-user',(req,res)=>{

  
  console.log(req.query.name);
  let searchOptions ={}
  // let searchUser = []
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
        userAddhelper.searchUser(searchOptions).then((searchResponse) => {
          // console.log(searchResponse)
          // req.session.currentname = response.name
          // req.session.currentMail = response.email
          req.session.currentUser = searchResponse
          req.session.currentValue = true
          
          searchUser = req.session.currentUser
          
          res.redirect('/admin')
          
        })
    }
    else{
      console.log("Entered");
      res.redirect('/admin')

    }
})

router.get('/enable-user',(req,res) => {

  let userId = req.query.id
  userAddhelper.enableUser(userId).then((response) => {
    console.log(response.status);
    if(response.status){
      req.session.successMsg = 'User account enabled'
      req.session.disableStatus = false
    }
    else{
      // req.session.errorMsg = response.errorMsg
    }

  })
  res.redirect('/admin')
})

router.get('/disable-user',(req,res) => {

  let userId = req.query.id
  userAddhelper.disableUser(userId).then((response) => {
    if(response.status){
      req.session.successMsg = 'User account disabled'
      req.session.disableStatus = true
    }
    else{
      req.session.errorMsg = response.errorMsg
    }
    res.redirect('/admin');
  })
})












module.exports = router;
