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
      resolve(user);
      }
    }
  });

});

};
let  createUser = (user)=>{

  return new Promise((resolve, reject)=>{

    db.collection('users').insertOne(user, function(err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });

});
}

let editDetails = (user)=>{

  return new Promise((resolve, reject)=>{

    db.collection('users').updateOne({mobile: user.mobile},{$set: {name: user.name}}, function(err, data) {
    if (err) {
      reject(err);
    } else {
        db.collection('contacts').update({contact: user.mobile},{$set: {contactName: user.name}}, {multi:true}, function(err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
    }
  });

});
}


let  getAllUsers = (user)=>{

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
          resolve(data);
        }
      }
  });

});
}
let  getUser = (mobile)=>{

  return new Promise((resolve, reject)=>{

    db.collection('users').findOne({'mobile': Number(mobile)},{_id: false}, function(err, data) {
      if (err){
        reject(err);}
         
       else {
        {
          resolve(data);
        }
      }
  });

});
}
let  addContact = (contactModel, nameUser)=>{

  return new Promise((resolve, reject)=>{
    coll = db.collection('contacts');
    // check if contact already exist
    getContact(contactModel.contact, contactModel.mobile).then(function (data) {
    // contact already exist
       resolve('already added');
    }, function(err) {
    // if contact is not already added, then add
    // add contact to both of users
    coll.insertMany([contactModel,{'mobile': contactModel.contact, 'contact': contactModel.mobile, 'contactName': nameUser, 'room': contactModel.room}], function(err, data) {
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
    db.collection('contacts').find({"mobile" : user}, {_id: false}).toArray(function(err, data) {
      if (err)
        reject(err);
       else {
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
    db.collection('contacts').find({ $and: [{'mobile' : mobile}, {'contact': contact}]}).toArray(function(err, data) {
      if (err)
        reject(err);
       else {
        if(data.length == 0) {
          reject('No contact found');

        }
        else
        {
        resolve(data);
        }
      }
  });

});
}

let  deleteContact = (mobile, contact)=>{

  return new Promise((resolve, reject)=>{
      db.collection('contacts').deleteOne({ $and: [{'mobile' : mobile}, {'contact': contact}]}, function(err, data) {
        if (err)
          reject(err);
         else {
          db.collection('contacts').deleteOne({ $and: [{'mobile' : contact}, {'contact': mobile}]}, function(err, data) {
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

let  createGroup = (mobile, contacts, group)=>{
document = [];
FLAG_ERROR = false;
contacts.forEach(cont => {
document.push({'mobile': cont, 'group': group});          
});

  return new Promise((resolve, reject)=>{

   coll = db.collection('groups'); 
    coll.insertOne({'mobile': mobile, 'group': group}, function(err, data) {
      if (err) {
       FLAG_ERROR = true;
       reject(err);
      } else {
          coll.insertMany(document, function(err, data) {
            if(err) {
              FLAG_ERROR = true;
              reject(err);
            }
            else {
              resolve('Group created succesfully');
          }
        });
        }
      });
    });
}
let  getAllGroups = (mobile)=>{

  return new Promise((resolve, reject)=>{
      db.collection('groups').find({'mobile' : mobile},{_id:0, mobile:0}).toArray(function(err, data) {
        if (err)
          reject(err);
         else {
          if(data.length == 0) {
            reject('No group found');
  
          }
          else
          {
          resolve(data);
          }
        }
    });
  
  });
  }

  let  deleteGroup = (mobile, group)=>{

    return new Promise((resolve, reject)=>{

        db.collection('groups').deleteOne({ $and: [{'mobile' : mobile}, {'group': group}]}, function(err, data) {
          if (err)
            reject(err);
              else{
               // send modified contact list
               db.collection('groupInfo').update({'group': group},{}, function(err, data) {

               });

                getAllGroups(mobile)
                .then(function (data) {
                 resolve(data)
              }, function(err) {
                 reject(err);
              });
              }
            });
          });
        }

let  saveChat = (user, contact, room, msg, messageId)=>{

  return new Promise((resolve, reject)=>{
    coll = db.collection('chatMessage');
    // check if chat exist then update chat
    
    getChat(room).then(function (data) {
    // console.log(data);
    data.messages.push({from: user, to: contact, messageId: messageId, message: msg, read: false});
    coll.updateOne({'room': room}, {$set: {messages: data.messages}}, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve("message saved");
      }
    });
    resolve("message saved")
    }, function(err) {
    // if chat is not exist, then add
    let chatSchema = {room: room, messages: [{from: user, to: contact,messageId: messageId, message: msg, read: false}]};
    coll.insertOne(chatSchema, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve("message saved");
      }
    });
})
});
}
let  getChat = (room)=>{
  return new Promise((resolve, reject)=>{
      db.collection('chatMessage').findOne({'room' : room}, {'_id': 0, 'room': 0}, function(err, data) {
        if (err)
          reject(err);
         else {
          if(!data) {
            reject('No chat found');
          }
          else
          {
          resolve(data);
          }
        }
    });
  
    });
  }
let updateRead = (room) => {
  return new Promise((resolve, reject) => {
    db.collection('chatMessage').findOne({'room' : room}, {'_id': 0, 'room': 0}, function(err, data) {
      if (err)
        reject(err);
       else {
        if(!data) {
          reject('No chat found');
        }
        else
        {
          let messages = data.messages;
          //update read of last message only
          messages[messages.length -1].read = true;
          db.collection('chatMessage').updateOne({'room': room}, {$set: {messages: messages}}, function(err, data) {
            if (err) {
              reject(err);
            } else {
              resolve("message updated");
            }
          });
        }
      }
  });

  })
}
// export service
service.ifRegistered = ifRegistered;
service.createUser = createUser;
service.getAllUsers = getAllUsers;
service.getUser = getUser;
service.addContact = addContact;
service.getAllContacts = getAllContacts;
service.getContact = getContact;
service.deleteContact = deleteContact;
service.createGroup = createGroup;
service.getAllGroups = getAllGroups;
service.deleteGroup = deleteGroup;
service.saveChat = saveChat;
service.getChat = getChat;
service.editDetails = editDetails;
service.updateRead = updateRead;
module.exports = service;
