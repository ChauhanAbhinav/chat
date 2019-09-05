import { Component, OnInit } from '@angular/core';
import { ChatService } from './../services/chat.service';
import { LoginService } from '../services/login.service';
import { SocketService} from './../services/socket.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
private users: any ;
private contacts: any;
private usersList = [];
private FLAG_ADD: any = 'Add Contact';
  constructor(private chatService: ChatService, private loginService: LoginService,  private socketService: SocketService) {
    this.getAllUsers();
   }
// get all users functions
private getAllUsers() {
  this.chatService.getAllUsers(this.loginService.user).subscribe(
    res => {
       if (res.status === 200) {
         this.users = res.body;
         this.chatService.getAllContacts(this.loginService.user).subscribe(
          response => {
            // contact found
            this.contacts = response.body;

            this.users.forEach((user) => {
              let flag = false;

              this.contacts.forEach( (contact) => {
                if ( user.mobile === contact.contact ) {
                flag = true;
               }
              });
              if (flag) {
                this.usersList.push({user, added: true});
              } else {
                this.usersList.push({user, added: false});
              }
            });
          },
          err => {
            // No contacts found
            this.users.forEach(user => {
              this.usersList.push({user, added: false});
            });
          });
       }
    },
    err => {
      // error
      });
}
   addContact(mobile, contactName) {
     // make model
const user = Number(this.loginService.user);
const nameUser = this.loginService.name;
const contact = Number( mobile );
const roomName =  String(contact) + String(user) ;  // room name assigned
const contactModel = { mobile : user, contact, contactName, room: roomName };


// add contact to db
this.chatService.addContact(contactModel, nameUser).subscribe(
  res => {
    // console.log('response', res);
    if (res.status === 200) {

      this.socketService.joinRoom(contact, roomName);
      this.usersList = [];
      this.getAllUsers();
    } else
    if (res.status === 202) {
      alert('Contact is already added');
    }
},
 err => {
  if (err.error) {
    console.log('Error:', err.error);
    // alert('Error: ' + err.error);
  } else {
    console.log('Unknown Error: ' + err);
    // alert('Unknown Error: ' + err);
 }
   });
}
  ngOnInit() {

  }

}
