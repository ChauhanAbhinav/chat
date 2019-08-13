const config = require('../config/config');
// Create authenticated Authy and Twilio API clients
const authy = require('authy')(config.authyKey);
const twilioClient = require('twilio')(config.accountSid, config.authToken);

let auth = {};

auth.sendAuthyToken = function(user, successCallback, errorCallback) {
let AuthyUser = { email: 'user@gmail.com', cellphone: user.mobile, countryCode: user.countryCode}
   
  if (!user.authyId) {
      // Register this user if it's a new user
      authy.register_user(AuthyUser.email, AuthyUser.cellphone, AuthyUser.countryCode,
          function(err, response) {
          if (err || !response.user) return errorCallback(err);
          user.authyId = response.user.id;
          console.log('registering new user');
              sendToken();
      });
  } else {
      // Otherwise send token to a known user
      console.log('registered authy id');
      sendToken();
  }

  // With a valid Authy ID, send the 2FA token for this user
  function sendToken() {
      authy.request_sms(user.authyId, true, function(error, response) {  //force : true
        if(error) errorCallback(error);
        else  
        successCallback(response, user);
      });

  }
};

// Test a 2FA token
auth.verifyAuthyToken = function(authyId, otp , cb) {

  authy.verify(179825188, otp, function(err, response) {
      cb(err, response);
  });
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