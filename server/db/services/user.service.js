// import db module
let mongo = require('../dbUtil');
var db;
mongo.connect((err, database)=>{
  if(err) {
    console.log(err);
    throw err;
}
db = database;
});

// user services
// var Promise = require('promise');
let service = {};

let  ifRegistered = (user)=>{

  return new Promise((resolve, reject)=>{

    db.collection('users').find({mobile: user.mobile}).toArray(function(err, data) {
    if (err)
      reject(err);
     else {
      if(data.length == 0) {
        reject('User not found');

      }
      else
      {
        // console.log('user found: ', user)
      resolve(user);
      }
    }
  });

});

};
let  createUser = (user)=>{

  return new Promise((resolve, reject)=>{

    db.collection('users').insert(user, function(err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });

});
}

let  getAllUsers = ()=>{

  return new Promise((resolve, reject)=>{

    db.collection('users').find({},{_id: false}).toArray(function(err, data) {
      if (err)
        reject(err);
       else {
        if(data.length == 0) {
          reject('No user found');

        }
        else
        {
          // console.log('user found: ', user)
        resolve(data);
        }
      }
  });

});
}

let  addGroup = (group)=>{
  console.log(group);
  let user1 = Number(String(group).slice(0,10));
  let user2 = Number(String(group).slice(10, 20));

  return new Promise((resolve, reject)=>{
    coll = db.collection('groups');
    coll.insertMany([{'mobile': user1, 'group': group},{'mobile': user2, 'group': group}], function(err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });

});
}

let  getGroups = (user)=>{

  return new Promise((resolve, reject)=>{
console.log(user);
    db.collection('groups').find({"mobile" : user}).toArray(function(err, data) {
      if (err)
        reject(err);
       else {
        //  console.log(data);
        if(data.length == 0) {
          reject('No user found');

        }
        else
        {
          // console.log('user found: ', user)
        resolve(data);
        }
      }
  });

});
}
// export service
service.ifRegistered = ifRegistered;
service.createUser = createUser;
service.getAllUsers = getAllUsers;
service.addGroup = addGroup;
service.getGroups = getGroups;

module.exports = service;
