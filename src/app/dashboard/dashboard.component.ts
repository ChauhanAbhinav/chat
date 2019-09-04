import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../services/login.service';
import { SocketService} from './../services/socket.service';
import { NotificationService} from './../services/notification.service';
import { ChatService } from './../services/chat.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private contacts;
  private socket;

  constructor(private loginService: LoginService, private chatService: ChatService,
              private socketService: SocketService, private route: ActivatedRoute, private Notification: NotificationService) {
  loginService.authenticate();
  loginService.getLoggedUser();
  loginService.getLoggedName(loginService.user);
  this.socket = socketService.socket;
  }

  public logout() {
  this.socketService.disconnect();
  this.loginService.logout();
  }

  ngOnInit() {
    if (this.loginService.user) {
      // only if user exists
      this.socketService.connect((user, contact, room, data) => {
        const children = this.route.snapshot.children;
        const path = children[0].url[0].path;
        if ((path !== 'private')) {
        this.Notification.notify = true;
        this.Notification.contacts[user] = true;
        } else {
          if (String(children[0].url[1].path) === String(user)) {
          } else {
            this.Notification.notify = true;
            this.Notification.contacts[user] = true;
             }
        }
      });
    }
  }
}
