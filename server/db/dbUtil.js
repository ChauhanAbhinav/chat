const MongoClient = require('mongodb').MongoClient;

const dbConfig = require('./config/config');
let callback, db;
// exporting the mongo
MongoClient.connect(dbConfig.dbUrl.remoteUrl,{ useNewUrlParser: true }, function(err, client){
    if(err) {
        console.log(err);
        throw err;
    }
    console.log('Mongodb connected');
    db = client.db(dbConfig.dbName);


    client.close();
    });

module.exports = function(){
    return db;
}