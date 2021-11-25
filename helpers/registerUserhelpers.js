var db = require('../config/connection')
var collections = require('../config/collections')
var bcrypt = require('bcrypt')
// const { response } = require('../app')

module.exports = {
    doRegister : (userData) => {
    
        return new Promise(async(resolve,reject)=>{
            console.log("entered");
            let response = {}
            userEmail = userData.email
            // console.log( userEmail);
            let user = await db.get().collection(collections.USER_COLLECTION).findOne({email : userEmail})
            console.log(user);
            console.log(userEmail);
            if(user == null){
                Password = userData.password
                userData.password = await bcrypt.hash(Password[0],10)
                userData.isEnabled = true;

                db.get().collection(collections.USER_COLLECTION).insertOne(userData).then((data)=>{
                    // console.log(data);
                    response.user = user 
                    response.status = true
                    resolve(response)
                    console.log("success");
                })
            }
            else{
                console.log("Reg failed");
                resolve({status:false})

            }
        })
        
    },

    doLogin : (userData) =>{
        return new Promise(async (resolve,reject)=>{
            let loginStatus = false
            let response = {}
            userEmail = userData.email
            userPassword = userData.password
            console.log("This is isEnabled error");
            let user = await db.get().collection(collections.USER_COLLECTION).findOne({email : userEmail})
            
                if(user){
                    if(user.isEnabled){

                    console.log('Entered');
                    bcrypt.compare(userPassword,user.password).then((status)=>{
                        
                        if(status){
                            console.log("login successful");
                            response.user = user
                            response.status = true
                            resolve(response)
                        }
                        else{
                            console.log("login failed");
                            resolve({status:false})
                        }
                    })

                }
                else{
                    response.blockMessg = "You Have Been blocked"
                    resolve({block : true, status : false})
                } 
                }
                else{
                    console.log("Invalid User");
                    resolve({status:false})
                }
            
                      
            
        })
    }
}