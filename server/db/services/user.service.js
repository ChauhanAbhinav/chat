// import db module
let mongo = require('../dbUtil');
let coll;
mongo.connect((err, db)=>{
  if(err) {
    console.log(err);
    throw err;
}
coll = db.collection('users');
});

// user services
// var Promise = require('promise');
let service = {};

let  ifRegistered = (user)=>{

  return new Promise((resolve, reject)=>{

    coll.find({mobile: user.mobile}).toArray(function(err, data) {
    if (err) 
      reject(err);
     else {
      if(data.length == 0) {
        reject('User not found');
      
      }
      else
      resolve(user);console.log();
    }
  });

});

};
let  createUser = (user)=>{
  
  return new Promise((resolve, reject)=>{

    coll.insert(user, function(err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });

});
}
// export service
service.ifRegistered = ifRegistered;
service.createUser = createUser;

module.exports = service;