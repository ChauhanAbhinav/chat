# Chat

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.

## Development server

git clone https://github.com/ChauhanAbhinav/chat.git

Run following command for dev server:-

cd chat
npm install
npm start

cd server
npm install
npm start
 
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Database 
Mongodb:- running or remote by default
for switching change url in server>db>dbUtils.js  

remoteUrl : 'mongodb+srv://<user>:<password>@cluster0-winsn.mongodb.net/test'
  user: abhinav, pass: mongoose
  
localUrl :- localUrl: 'mongodb://127.0.0.1:27017'

DB Name: chat
collections: Users, contacts, chatMessage

## Note:

1. Read reciept and routing guards are left.

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
