import { Component, OnInit } from '@angular/core';
import { ChatService } from './../services/chat.service';
import { MatList, MatListItem } from '@angular/material/list';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
private users: any ;
private FLAG_ADD: any = 'Add Contact';
  constructor(private chatService: ChatService, private loginService: LoginService, private router: Router) {
    this.chatService.getAllUsers().subscribe(
      res => {
         if (res.status === 200) {
          this.users = res.body;
          // console.log(this.users);
         }
      },
      err => {
        console.log('Error:', err.error);
        });
   }

   addContact(data) {
     // make model
const user = Number(this.loginService.getLoggedUser());
const contactNumber = Number( data );
const roomName = String(user) + String(contactNumber);  // room name assigned
const contactModel = { mobile : user, contact: contactNumber, room: roomName };

this.chatService.addContact(contactModel).subscribe(
  res => {
    console.log('response', res);
    if (res.status === 200) {
      alert('contact added');
      // this.router.navigateByUrl('dashboard/private/' + contactModel.contact + '/' + contactModel.room);
    } else
    if (res.status === 202) {
      alert('Contact is already added');
    }
},
 err => {
  if (err.error) {
    // console.log('Error:', err.error);
    alert('Error: ' + err.error);
  } else {
    // console.log('Unknown Error: ' + err);
    alert('Unknown Error: ' + err);
 }
   });
}

  ngOnInit() {

  }

}
