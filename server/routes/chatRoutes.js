const express = require('express');
const app = express();
const router = express.Router();

let userService = require('../db/services/user.service');

router.get('/userslist',(req, res)=>{
  userService.getAllUsers()
  .then(function (data) {
          res.status(200).json(data);
      }, function(err) {
      // console.log(err);
       // registration failed
       res.status(400).json(err);
  })

});

router.post('/addContact',(req, res)=>{
  // console.log("req",req.body);
  userService.addContact(req.body)
  .then(function (data) {
      if(data == 'already added')
          res.status(202).json('Contact is already added');  // accepted
        else{
          res.status(200).json(data);   // ok
        }
      }, function(err) {
      // console.log(err);
       res.status(400).json(err);
  });

});

router.post('/getallcontacts',(req, res)=>{
  // console.log(req.body.user);
  userService.getAllContacts(req.body.mobile)
  .then(function (data) {
          res.status(200).json(data);
      }, function(err) {
      // console.log(err);
       // registration failed
       res.status(400).json(err);
  })

});

router.post('/getcontact',(req, res)=>{
  // console.log(req.body);
  userService.getContact(req.body.mobile, req.body.contact)
  .then(function (data) {
          res.status(200).json(data);
      }, function(err) {
      // console.log(err);
       res.status(400).json(err);
  })

});

router.post('/deletecontact',(req, res)=>{
  // console.log(req.body);
  userService.deleteContact(req.body.mobile, req.body.contact)
  .then(function (data) {
          res.status(200).json(data);
      }, function(err) {
      // console.log(err);
       res.status(400).json(err);
  })

});

module.exports = router;
