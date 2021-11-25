var db = require('../config/connection')
var collections = require('../config/collections')
var ObjectID = require('mongodb').ObjectID
var bcrypt = require('bcrypt')

module.exports = {
    addUser : async (user) =>{

        return new Promise( (resolve,reject) => {
            userEmail = user.email
            let response = {}
            db.get().collection(collections.USER_COLLECTION).findOne({email : userEmail}).then(async (emailExists) => {
                console.log("This is emaiExists");
                console.log(emailExists);
                if(emailExists == null){
                Password = user.password
                user.password = await bcrypt.hash(Password,10)
                user.isEnabled = true;
                db.get().collection(collections.USER_COLLECTION).insertOne(user).then((data) => {
                    response.userData = user
                    response.status = true
                    resolve(response)
                })
                }
                else{
                    console.log("This is else case");
                    response.status = false
                    resolve(response)
                }
            })
        })

     },

     getAllUsers : () =>{
         return new Promise(async (resolve,reject)=>{
             let users = await db.get().collection(collections.USER_COLLECTION).find().toArray()
             resolve(users)
         })
     },

     deleteUser : (userId) =>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.USER_COLLECTION).deleteOne({_id:ObjectID(userId)}).then((response)=>{
                resolve(response)
            })
        })
     },
    
    getUserData : (editId) =>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.USER_COLLECTION).findOne({_id : ObjectID(editId)}).then((user)=>{
                resolve(user)
            })
        })
    },

    updateUser :  async (updateId, userData) => {
        console.log(updateId);
        Password = userData.password
        userData.password = await bcrypt.hash(Password,10)
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.USER_COLLECTION).updateOne({_id : ObjectID(updateId)},
            {$set : {
                name : userData.name,
                email : userData.email,
                password : userData.password
            }}
            ).then((response) => {
                resolve()
            })
    })
    },
    searchUser : (name) =>{
        console.log(name.name);
        return new Promise(async(resolve,reject)=>{
          let user = await  db.get().collection(collections.USER_COLLECTION).find({name : name.name}).toArray()
          console.log(user);
          resolve(user)
        })
    },
    enableUser : (userId) => {
        return new Promise(async (resolve,reject) => {

            db.get().collection(collections.USER_COLLECTION)
            .updateOne({ _id : ObjectID(userId) }, {
                $set : {
                    isEnabled : true
                }
            }).then(() => {
                resolve({status : true})
            })
        })
    },

    disableUser : (userId) => {
        return new Promise((resolve,reject) => {
            db.get().collection(collections.USER_COLLECTION)
            .updateOne({ _id : ObjectID(userId) }, {
                $set : {
                    isEnabled : false
                }
            }).then(() => {
                resolve({status : true})
            })
        })        
    }
}