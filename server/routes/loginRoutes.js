const express = require('express');
const app = express();
const router = express.Router();
const twilio = require('../twilio/index');
let user= {};
//importing user services
 let userService = require('../db/services/user.service');

 // check if registered
router.post('/ifregistered',(req, res)=>{
    userService.ifRegistered(req.body)
    .then(function (user) {
            // authentication successful
            // console.log('User is already registered');
            res.status(200).json('Please wait!, You will recieve an OTP');
    }, function(err) {
         // User is not registered
         console.log(err);
         res.status(404).json('User is not registered');
        //  res.redirect(307,'/register');   // temporary redirect with same data

    });   
})
// register user

router.post('/register',(req, res)=>{
    userService.createUser(req.body)
    .then(function (data) {
            // registration successful
            // console.log('Registration successful');
            res.status(200).json('Registration Successful');
        }, function(err) {
        console.log(err);
         // registration failed
         res.status(400).json(err);
    })
    
})
// send token

router.post('/sendtoken',(req, res)=>{

    twilio.sendAuthyToken(req.body,(response, authyId)=>{
        // success callback
        // console.log(response);
        user.authyId = authyId;
        res.status(200).json('Token is sent on given phone');
        
    },
    (error)=>{ 
        //error callback
        // console.log('error: ',error);
        res.status(400).json('Token not sent, Error: '+JSON.stringify(error.message));
    });
});
// varify token

router.post('/verifytoken', (req, res)=>{
    // console.log(user.authyId);
    twilio.verifyAuthyToken(user.authyId, req.body.token, (error, response)=>{
            if(error){
                // console.log('Token verification error:',error);
                res.status(400).json(error.message);
                
            }
            else{
                // console.log('Token verification successful: ',response);
                res.status(200).json(response.message);
            }
    })
    
});

router.post('/editdetails',(req, res)=>{
    userService.editDetails(req.body)
    .then(function (data) {
            res.status(200).json('Update Successful');
        }, function(err) {
        // console.log(err);
         // registration failed
         res.status(400).json(err);
    })
    
})
router.get('/',(req, res)=>{
    res.json('node is listening');
});
module.exports = router;