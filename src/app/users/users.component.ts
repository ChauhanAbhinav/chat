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

   createGroup(mobile) {
let user = this.loginService.getLoggedUser();
let group = user + '' + mobile;
this.chatService.createGroup(group).subscribe(
  res => {
    if (res.status === 200) {
      this.router.navigateByUrl('dashboard/private/' + group);
    }
 },
 err => {
   console.log('Error:', err.error);
   });

}

  ngOnInit() {

  }

}
