const dbName = 'chat';
const dbUser = {
    user: 'abhinav',
    pass: 'mongoose'
}
const dbUrl = {
    remoteUrl: 'mongodb+srv://'+dbUser.user+':'+dbUser.pass+'@cluster0-winsn.mongodb.net/test',
    LocalUrl: 'localhost:27017'
}
const dbConfig = {dbName: dbName, dbUrl: dbUrl, dbUser: dbUser}

//export
module.exports = dbConfig;