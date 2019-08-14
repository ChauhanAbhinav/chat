const express = require('express');
const app = express();
const router = express.Router();
const twilio = require('../twilio/index');
let user= {};
//importing user services
 let userService = require('../db/services/user.service');

 // check if registered

router.post('/login',(req, res)=>{
    // console.log(req.body);
    if(!req.body.otp){
    userService.ifRegistered(req.body)
    .then(function (user) {
            // authentication successful
            console.log('User is registered');
            res.redirect(307,'/sendtoken');
    }, function(err) {
         // User is not registered
         console.log(err);
         res.redirect(307,'/register');   // temporary redirect with same data

    })
} else{
    res.redirect(307,'/varifytoken');
}
    
})
// register user

router.post('/register',(req, res)=>{
    userService.createUser(req.body)
    .then(function (data) {
            // registration successful
            console.log('Registration successful');
            res.redirect(307, '/sendtoken');
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
        console.log(response);
        user.authyId = authyId;
        res.status(200).json('Token is sent on given phone');
        
    },
    (error)=>{ 
        //error callback
        console.log('error: ',error);
        res.status(400).json('Token not sent, Error: '+JSON.stringify(error.message));
    });
});
// varify token

router.post('/varifytoken', (req, res)=>{
    console.log(user.authyId);
    twilio.verifyAuthyToken(user.authyId, req.body.otp, (error, response)=>{
            if(error){
                console.log('Token varification error:',error);
                res.status(400).json(JSON.stringify(error.message));
                
            }
            else{
                console.log('Token varification successful: ',response);
                res.status(200).json('Token varification successful: '+JSON.stringify(response.message));
            }
    })
    
});

router.get('/',(req, res)=>{
    res.json('node is listening');
});
module.exports = router;