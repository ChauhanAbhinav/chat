import { Component, OnInit, Input, TemplateRef} from '@angular/core';
import { ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { LoginService } from '../services/login.service';
import {ActivatedRoute} from '@angular/router';
import { SocketService} from './../services/socket.service';
import { ChatService} from './../services/chat.service';
import { NotificationService} from './../services/notification.service';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit, AfterViewInit {
  private contact;
  private room;
  private user;
  private name;
  private socket;
  private input;
  private html;
  private chat;
  private message;
  private FLAG_SENDER: boolean;
  private vis;

  @ViewChild('inputBox', {static: false}) private inputBox: ElementRef;
  @ViewChild('conversation', {static: false}) private conversation: ElementRef;
  @ViewChild('read', {static: false}) private read: ElementRef;

    constructor(private route: ActivatedRoute, private loginService: LoginService,
                private socketService: SocketService, private Notification: NotificationService, private chatService: ChatService) {
    this.user = loginService.getLoggedUser();
    this.socket = this.socketService.socket;
    this.contact = route.snapshot.params.contact;
    this.room = route.snapshot.params.room;
    this.getChat(this.room);
    this.getName(this.contact);
    this.Notification.notify = false;
    delete this.Notification.contacts[this.contact];
    // alert();
  }
private sendMessage(event) {
if (event.which === 13) {
  this.socket.emit('sendchat', this.user, this.contact, this.room, this.input);
  this.input = '';
}
}
private getName(contact){
  this.chatService.getUser(contact).subscribe(
    res => {
      if (res.status === 200) {
        for (let key in res.body) {
          if ((key === 'name')) {
            const name = String(res.body[key]);
            this.name = name;
          }
        }
      }
  },
   err => {
    if (err.error) {
     return false;
    }
     });
}
private getChat(room) {
this.chatService.getChat(room).subscribe(
  res => {
    // console.log('response', res);
    if (res.status === 200) {
      // console.log(JSON.parse(JSON.stringify(res.body)).messages);
      this.chat = JSON.parse(JSON.stringify(res.body)).messages;
      this.showMessage();
    }
},
 err => {
  if (err.error) {
    console.log('Error:', err.error);
    // alert('Error: ' + err.error);
  }
   }
);
 }

 private showMessage() {
   this.chat.forEach(chat => {
     if (chat.from === this.user) {
      // tslint:disable-next-line: max-line-length
      this.message = '<li style="height: 28px; width: 100%;text-align: right;"><span style="width: 150px;padding: 5px; margin:5px; height: auto;background: rgba(63, 81,181,0.4); border-radius: 2px;">' + chat.message +
      '</span></li>';
      this.conversation.nativeElement.insertAdjacentHTML('beforeend', this.message);
     } else {
      // tslint:disable-next-line: max-line-length
      this.message = '<li style="height: 28px; width: 100%;text-align: left;"><span style="width: 150px;padding: 5px; margin:5px; height: auto;background: rgba(350, 350,350,1); border-radius: 2px;">' + chat.message +
      '</span></li>';
      this.conversation.nativeElement.insertAdjacentHTML('beforeend', this.message);
     }
   });
 }
  ngOnInit() {
    // remove previous listener
    this.socket.removeListener('updatechat');
    // chat recieved
    this.socket.on('updatechat', (user, contact, room, data) => {
      // alert(room);
      if (room === this.room) {
      if (String(user) === String(this.user)) {
        // sender
        // tslint:disable-next-line: max-line-length
        this.html = '<li style="height: 28px; width: 100%;text-align: right;"><span style="width: 150px;padding: 5px; margin:5px; height: auto;background: rgba(63, 81,181,0.4); border-radius: 2px;">' + data +
        '</span></li>';
        this.conversation.nativeElement.insertAdjacentHTML('beforeend', this.html);
        this.FLAG_SENDER = true;
        } else {
        // reciever
        this.FLAG_SENDER = false;
        // tslint:disable-next-line: max-line-length
        this.html =  '<li style="height: 28px; width: 100%;text-align: left;"><span style="width: 150px;padding: 5px; margin:5px; height: auto;background: rgba(350, 350,350,1); border-radius: 2px;">' + data +
        '</span></li>';
        this.conversation.nativeElement.insertAdjacentHTML('beforeend', this.html);

        // this.socket.emit('sendVisibility', vis());
        // $('#read').html("");
      }
    }
    });

// visibility api ========================================================
    this.vis = (() => {
      if (!document.hidden) {
        return false;
    } else { return true; }
    });
// update read when user come later in time
    this.vis(function() {
  if (this.vis()) {
    if (!this.FLAG_SENDER) {
      this.socket.emit('sendVisibility', this.vis());
    }
    console.log('visible now');

  }
 });

  }
  ngAfterViewInit(): void {
    this.inputBox.nativeElement.focus();
  }

}
