# Chat

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.
This is a chat application in which user can add users to their contact list and have chat with them without lossing any data.

## functionalities

OTP  varification, Message saved to batabase, read receipt, automatic room creation from contacts list. 

## Development server

Run following command in your workspace:

git clone https://github.com/ChauhanAbhinav/chat.git

// client 'http://localhost:4200/

cd chat
npm install
npm start

//server  http://localhost:3000/

cd server
npm install
npm start
 
Navigate to `http://localhost:4200/`. 

## Database 

Mongodb:- running on remote by default
for switching to local change url in server>db>dbUtils.js  

remoteUrl : mongodb+srv://cluster0-winsn.mongodb.net/test

mongo shell: mongo "mongodb+srv://cluster0-winsn.mongodb.net/test" --username abhinav

mongo compass : mongodb+srv://abhinav:<password>@cluster0-winsn.mongodb.net/test

DB Name: chat

collections: 
1. users :- collection that store primary information of user i.e mobile,  country code and and name
     eg- 
     
     {
     "_id":"5d710302e85bdf72bf3ac110", 
     "mobile":1111111111, 
     "countryCode":"+91", 
     "name":"Name01" 
     }
     
2. contacts:- added contact will be store in this collection, a room will be assigned to both users.
    eg-
    
    {
    "_id":"5d7131acc643910edf2308ee", 
    "mobile":1111111111, 
    "contact":2222222222, 
    "contactName":"Name02", 
    "room":"22222222221111111111" 
    }
    
3. chatMessage: message will be strored in this collection. query can be made by distinct room name and all the messages are stored in a messages array as given below.
In every elememnt of array we have from, to, messageId , message and read fields. from represents sender and to represent reciever, reciever has read the messsages or not is represented by the read of last message.  

    {
    "_id":"5d7215c096fab91104edeff4", 
    "room":"44444444443333333333", 
    "messages":[
                {
                "from":3333333333,
                "to":"4444444444",
                "messageId":9,
                "message":"hi",
                "read":true
                },
                {
                "from":4444444444,
                "to":"3333333333",
                "messageId":1,
                "message":"ki",
                "read":true
                }
                ]
    }

## Note:

1. Routing guards are left. But app is able to handle normal routing breaches.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
