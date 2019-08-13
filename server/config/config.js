const cfg = {};

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;

// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
//
// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.
cfg.accountSid = 'AC8d4d80c5a703e77240a37b2d40880402';
cfg.authToken = 'e016dc46aea0e551e8eb2546eca8b042';

// A Twilio number you control - choose one from:
// https://www.twilio.com/user/account/phone-numbers/incoming
// Specify in E.164 format, e.g. "+16519998877"
cfg.twilioNumber = +19384440727;

// Your Authy production key - this can be found on the dashboard for your
// Authy application
cfg.authyKey = 'a72OEVsZ9QZVtjBo9HMahhFFbKHeDMa1';

module.exports = cfg;