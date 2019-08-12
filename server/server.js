// dependencies
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// configuration
const PORT = 3000 || process.env.PORT ;
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//importing routes
var router = require('./routes/loginRoutes');
app.use('/', router); // applying routes to the app

// starting the server
app.listen(PORT,()=>{
    console.log('server is listening on port '+PORT);
});