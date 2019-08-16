const config = require('../config/config');
// Create authenticated Authy and Twilio API clients
const authy = require('authy')(config.authyKey);
const twilioClient = require('twilio')(config.accountSid, config.authToken);

let auth = {};

auth.sendAuthyToken = function(user, successCallback, errorCallback) {
   
  if (!user.authyId) {
      // Register this user if it's a new user
      authy.register_user('user@gmail.com', user.mobile, user.countryCode,
          function(err, response) {
          if (err || !response.user) return errorCallback(err);
          user.authyId = response.user.id;
          successCallback(response, user.authyId);  // FOR TESTING PURPOSE
              // sendToken();
      });
  } else {
      // Otherwise send token to a known user
      console.log('registered authy user found');
       successCallback(response, user.authyId);  // FOR TESTING PURPOSE
      // sendToken();
  }

  // With a valid Authy ID, send the 2FA token for this user
  function sendToken() {
      authy.request_sms(user.authyId, true, function(error, response) {  //force : true
        if(error) errorCallback(error);
        else  
        successCallback(response, user.authyId);
      });

  }
};

// Test a 2FA token
auth.verifyAuthyToken = function(authyId, token, cb) {
let response={};
 response.message = "token is valid";
 let error={};
 error.message = "token is invalid";
  cb(null, response);

  // authy.verify(authyId, token, function(error, response) {
  //   cb(error, response);
  // });
};

// Send a text message via twilio to this user
auth.sendMessage = function(message, number, successCallback, errorCallback) {
   
    const toNumber = '+91'+number;

    twilioClient.messages.create({
        to: toNumber,
        from: config.twilioNumber,
        body: message,
    }).then(function() {
      successCallback();
    }).catch(function(err) {
      errorCallback(err);
    });
};

module.exports = auth;