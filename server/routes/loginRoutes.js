const express = require('express');
const app = express();
const router = express.Router();
const twilio = require('../twilio/index');

//importing user services
 let userService = require('../db/services/user.service');

router.post('/login',(req, res)=>{

    console.log(req.body);
    userService.ifRegistered(req.body)
    .then(function (user) {
            // authentication successful
            
            console.log('User is registered');
            //send otp
            
            // twilio.sendAuthyToken(user,(response, user)=>{
            //     // success callback
            //     console.log(response);
            //     res.status(200).json('User is registered, otp sent'+JSON.stringify(response));

            //     // twilio.verifyAuthyToken(user, user.otp, (error, response)=>{
            //     //     // console.log('authy id',user.authyId) // 179825188
            //     //         if(error){
            //     //             console.log('Otp Varifucation error:',error)
            //     //         }
            //     //         else{
            //     //             console.log('otp varification successful: ',response)
            //     //         }
            //     // })
                
            // },
            // (err)=>{ 
            //     //error callback
            //     console.log('error: ',err);
            //     res.status(400).json('User is registered, otp is not sent, Error: '+JSON.stringify(err.message));
            // });
            res.status('200').json('');
            twilio.verifyAuthyToken(179825188, user.otp, (error, response)=>{
                if(error){
                    console.log('Otp Varifucation error:',error)
                }
                else{
                    console.log('otp varification successful: ',response)
                }
        });
    }, function(err) {
        console.log(err);
         // User is not registered
         console.log(err);
         res.status(404);  //204: no content, 404: not found 
         res.redirect(307,'/register');   // temporary redirect with same data

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