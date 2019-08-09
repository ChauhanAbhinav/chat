const express = require('express');
const app = express();
const router = express.Router();

//importing user services
 let userService = require('../db/services/user.service');

router.post('/api/login',(req, res)=>{
    res.json("success");
   
});
router.get('/',(req, res)=>{
    res.json('node is listening');
   
});
module.exports = router;