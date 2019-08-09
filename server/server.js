// dependencies
var express = require('express');
var app = express();
// var router = express.Router();

const bodyParser = require('body-parser');
const cors = require('cors');

//importing routes
var router = require('./routes/loginRoutes');

// configuration
const PORT = 3000 || process.env.PORT ;
app.use('/', router); // applying routes to the app
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// starting the server
app.listen(PORT,()=>{
    console.log('server is listening on port '+PORT);
});