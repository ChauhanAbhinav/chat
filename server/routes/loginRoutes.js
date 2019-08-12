const express = require('express');
const app = express();
const router = express.Router();

//importing user services
 let userService = require('../db/services/user.service');

router.post('/login',(req, res)=>{

    console.log(req.body);
    userService.ifRegistered(req.body)
    .then(function (data) {
            // authentication successful
            console.log('Authentication successful');
            res.status(200).json('Authentication successful');  // 302: found
           
    }, function(err) {
        console.log(err);
         // authentication failed
         console.log(err);
         res.status(404);  //204: no content
         res.json('Authentication failed');
        //  res.redirect(307,'/register');   // temporary redirect with same data
         
    })
    
})

router.post('/register',(req, res)=>{

    console.log(req.body);
    userService.createUser(req.body)
    .then(function (data) {
            // registration successful
            console.log('Registration successful');
            res.status(201).json('Registration successful');    //201 : create
    }, function(err) {
        console.log(err);
         // registration failed
         res.status(400).json(err);
    })
    
})

router.get('/',(req, res)=>{
    res.json('node is listening');
   
});
module.exports = router;