import { Component, OnInit } from '@angular/core';
import { ChatService } from './../services/chat.service';
import { MatList, MatListItem } from '@angular/material/list';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  private groups: any ;
  constructor(private chatService: ChatService, private loginService: LoginService, private router: Router) {

    this.chatService.getGroups(this.loginService.getLoggedUser()).subscribe(
      res => {
         if (res.status === 200) {
          this.groups= res.body;
          // console.log(this.users);
         }
      },
      err => {
        console.log('Error:', err.error);
        });
   }

   startChat(group){
    this.router.navigateByUrl('dashboard/private/'+group);
   }


  ngOnInit() {
  }

}
