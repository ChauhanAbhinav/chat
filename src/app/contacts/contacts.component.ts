import { Component, OnInit } from '@angular/core';
import { ChatService } from './../services/chat.service';
import { MatList, MatListItem } from '@angular/material/list';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  private contacts: any ;
  private user: any = this.loginService.getLoggedUser();

  constructor(private chatService: ChatService, private loginService: LoginService,
              private router: Router, private cookieService: CookieService) {

    this.chatService.getAllContacts(this.user).subscribe(
      res => {
         if (res.status === 200) {
          this.contacts = res.body;
          // console.log(this.contacts);
         }
      },
      err => {

        console.log('Error:', err.error);
        });
   }

   startChat(contact, room) {
    // console.log(room);
    if ((typeof contact !== 'undefined') && (typeof room !== 'undefined')) {
      this.router.navigateByUrl('dashboard/private/' + contact + '/' + room);
   } else {
      alert('Not able to locate the room');
   }
  }

  deleteContact(contact) {
    this.chatService.deleteContact(this.user, contact).subscribe(
      res => {
         if (res.status === 200) {
          alert('Contact deleted');
          // this.router.navigateByUrl('/dashboard/contacts');
         }
      },
      err => {

        console.log('Error:', err.error);
        alert('Error: ' + err.error);
        });
   }

  ngOnInit() {
  }

}
