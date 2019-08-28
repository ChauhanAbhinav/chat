import { Component, OnInit } from '@angular/core';
import { ChatService } from './../services/chat.service';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
private groups;
private user;
  constructor(private chatService: ChatService, private loginService: LoginService, private router: Router) {
    this.user = loginService.getLoggedUser();
    this.chatService.getAllGroups(this.user).subscribe(
      res => {
         if (res.status === 200) {
          this.groups = res.body;
          // console.log(this.groups);
         }
      },
      err => {
        console.log('Error:', err.error);
        });
   }
   private startChat(user, group) {
    if ((typeof  user !== 'undefined') && (typeof group !== 'undefined')) {
      this.router.navigateByUrl('dashboard/group/' + user + '/' + group);
   } else {
      alert('Not able to locate the room');
   }
  }

   // delete group function
private deleteGroup(user, group) {
  this.chatService.deleteGroup(user, group).subscribe(
    res => {
       if (res.status === 200) {
        this.groups = res.body;
       }
    },
    err => {
      if (err.status === 400) {
         // no user left
        delete this.groups;
      } else {
        console.log('Error:', err.status);
        alert('Error: ' + err.error);
      }
      });
 }

  ngOnInit() {
  }

}
