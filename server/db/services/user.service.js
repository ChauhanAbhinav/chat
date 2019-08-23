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

let  addContact = (contactModel)=>{
  // console.log(contactModel);

  return new Promise((resolve, reject)=>{
    coll = db.collection('contacts');
    // check if contact already exist
    getContact(contactModel.contact, contactModel.mobile).then(function (data) {
    // contact already exist
       resolve('already added');
    }, function(err) {
    // if contact is not already added, then add
    // add contact to both of users
    coll.insertMany([contactModel,{'mobile': contactModel.contact, 'contact': contactModel.mobile, 'room': contactModel.room}], function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
})
  
  

});
}

let  getAllContacts = (user)=>{

  return new Promise((resolve, reject)=>{
// console.log(user);
    db.collection('contacts').find({"mobile" : user}).toArray(function(err, data) {
      if (err)
        reject(err);
       else {
        //  console.log(data);
        if(data.length == 0) {
          reject('No user found');

        }
        else
        {
        resolve(data);
        }
      }
  });

});
}
let  getContact = (mobile, contact)=>{

return new Promise((resolve, reject)=>{
// console.log(data);
    db.collection('contacts').find({ $and: [{'mobile' : mobile}, {'contact': contact}]}).toArray(function(err, data) {
      if (err)
        reject(err);
       else {
        //  console.log(data);
        if(data.length == 0) {
          reject('No contact found');

        }
        else
        {
          // console.log('contact found: ', user)
        resolve(data);
        }
      }
  });

});
}

let  deleteContact = (mobile, contact)=>{

  return new Promise((resolve, reject)=>{
  // console.log(data);
      db.collection('contacts').remove({ $and: [{'mobile' : mobile}, {'contact': contact}]}, function(err, data) {
        if (err)
          reject(err);
         else {
          db.collection('contacts').remove({ $and: [{'mobile' : contact}, {'contact': mobile}]}, function(err, data) {
            // console.log('contact found: ', user)
            if (err)
            reject(err);
            else{
             // send modified contact list
              getAllContacts(mobile)
              .then(function (data) {
               resolve(data)
            }, function(err) {
               reject(err);
            })
            }
          });
        }
      });
  });
};
// export service
service.ifRegistered = ifRegistered;
service.createUser = createUser;
service.getAllUsers = getAllUsers;
service.addContact = addContact;
service.getAllContacts = getAllContacts;
service.getContact = getContact;
service.deleteContact = deleteContact;
module.exports = service;
