const MongoClient = require('mongodb').MongoClient;

const dbConfig = require('./config/config');
let callback, db;
// exporting the mongo
mongo = {
connect: (callback)=> {
   if(!db) MongoClient.connect(dbConfig.dbUrl.remoteUrl,{ useNewUrlParser: true }, function(err, client){

    if(err) throw err;
    console.log('Mongodb connected');
    db = client.db(dbConfig.dbName);
    // client.close();

    callback(err, mongo.getDb()); // db will be passed in the argument of  call back
    });
    else {
        callback(null, mongo.getDb());
    }
},
getDb: function(){

    return db;
}

}
module.exports = mongo;
