// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC8d4d80c5a703e77240a37b2d40880402';
const authToken = 'e016dc46aea0e551e8eb2546eca8b042';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+19384440727',
     to: '918949965878'
   })
  .then(message => console.log(message.sid));
