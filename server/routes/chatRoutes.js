const express = require('express');
const app = express();
const router = express.Router();

let userService = require('../db/services/user.service');

router.get('/userslist',(req, res)=>{
  userService.getAllUsers()
  .then(function (data) {
          res.status(200).json(data);
      }, function(err) {
      console.log(err);
       // registration failed
       res.status(400).json(err);
  })

});

router.post('/addgroup',(req, res)=>{
  // console.log("req",req.body);
  userService.addGroup(req.body.group)
  .then(function (data) {
          res.status(200).json(data);
      }, function(err) {
      console.log(err);
       res.status(400).json(err);
  });

});

router.post('/getgroups',(req, res)=>{
  // console.log(req.body.user);
  userService.getGroups(req.body.user)
  .then(function (data) {
          res.status(200).json(data);
      }, function(err) {
      console.log(err);
       // registration failed
       res.status(400).json(err);
  })

});

module.exports = router;
