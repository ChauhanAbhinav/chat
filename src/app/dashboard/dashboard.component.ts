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
  private user;
  private contacts;
  private socket;

  constructor(private loginService: LoginService, private chatService: ChatService,
              private socketService: SocketService, private route: ActivatedRoute, private Notification: NotificationService) {
  loginService.authenticate();
  this.user = loginService.getLoggedUser();
  loginService.getLoggedName(this.user);
  this.socket = socketService.socket;
  }

  public logout() {
  this.socketService.disconnect();
  this.loginService.logout();
  }

  ngOnInit() {
  this.socketService.connect((user, contact, room, data) => {
    // alert('to:' + contact + 'from: ' + user + 'data: ' + data);
    const children = this.route.snapshot.children;
    const path = children[0].url[0].path;
    // tslint:disable-next-line: max-line-length
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
