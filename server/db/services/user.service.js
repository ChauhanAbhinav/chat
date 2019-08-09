// import db module
let db = require('../dbUtil');
console.log(db());
let service = {};
// let coll = db.collection('users');

let  ifRegistered = (user)=>{
    coll.find({user}).toArray(function(err, data) {
        if (err) {
         console.log(err);
         return false;
        } 
        else {
        console.log('user is registered');
        return true;
        }
      });
}
let  createUser = ()=>{
    coll.insert(user,function(err, data) {
        if (err) {
         console.log(err);
         return false;
        } 
        else {
        console.log('user inserted');
        return true;  
      }
      });
}
// export service
service.ifRegistered = ifRegistered;
service.createUser = createUser;

module.exports = service;