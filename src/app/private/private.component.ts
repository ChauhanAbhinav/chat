import { Component, OnInit, Input, HostListener} from '@angular/core';
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
  private contactName;
  private room;
  private socket;
  private input;
  private html;
  private chat;
  private message;
  private FLAG_SENDER = false;
  private getVisibility;

  @ViewChild('inputBox', {static: false}) private inputBox: ElementRef;
  @ViewChild('conversationList', {static: false}) private conversationList: ElementRef;
  @ViewChild('read', {static: false}) private read: ElementRef;
  @HostListener('document: visibilitychange') handleVisChange() {
    if (this.socketService.getVisibility()) {
      if (!this.FLAG_SENDER) {
        this.socket.emit('sendVisibility', this.socketService.getVisibility(), this.room);
      }
    }
  }
    constructor(private route: ActivatedRoute, private loginService: LoginService,
                private socketService: SocketService, private Notification: NotificationService, private chatService: ChatService) {

    this.socket = this.socketService.socket;
    this.contact = route.snapshot.params.contact;
    this.room = route.snapshot.params.room;
    this.getChat(this.room);
    this.getName(this.contact);
    this.Notification.notify = false;
    delete this.Notification.contacts[this.contact];
  }
private sendMessage(event) {
if (event.which === 13 && this.input !== '') {
  const messageId = Math.round(Math.random() * 10);
  this.socket.emit('sendchat', this.loginService.user, this.contact, this.room, this.input, messageId);
  this.input = '';
}
}
private getName(contact) {
  this.chatService.getUser(contact).subscribe(
    res => {
      if (res.status === 200) {
        for (const key in res.body) {
          if ((key === 'name')) {
            const name = String(res.body[key]);
            this.contactName = name;
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
    if (res.status === 200) {
      this.chat = JSON.parse(JSON.stringify(res.body)).messages;
      const length = this.chat.length;
      if (length > 0) {
        if (this.chat[length - 1].from === this.loginService.user) {
          this.FLAG_SENDER = true;
          if (this.chat[length - 1].read) {
            this.read.nativeElement.innerHTML = '&#10003;';
          } else {
                this.read.nativeElement.innerHTML = '';
          }
        } else {
          this.FLAG_SENDER = false;
          this.socket.emit('sendVisibility', this.socketService.getVisibility(), this.room);
        }
      }  else {

      }
      this.showMessage();
    }
},
 err => {
  if (err.error) {
  }
   }
);
 }

 private showMessage() {
   this.chat.forEach(chat => {
     if (chat.from === this.loginService.user) {
      // tslint:disable-next-line: max-line-length
      this.message = '<li style="height: 28px; width: 100%;text-align: right;"><span style="width: 150px;padding: 5px; margin:5px; height: auto;background: rgba(63, 81,181,0.4); border-radius: 2px;">' + chat.message +
      '</span></li>';
      this.conversationList.nativeElement.insertAdjacentHTML('beforeend', this.message);
     } else {
      // tslint:disable-next-line: max-line-length
      this.message = '<li style="height: 28px; width: 100%;text-align: left;"><span style="width: 150px;padding: 5px; margin:5px; height: auto;background: rgba(350, 350,350,1); border-radius: 2px;">' + chat.message +
      '</span></li>';
      this.conversationList.nativeElement.insertAdjacentHTML('beforeend', this.message);
     }
   });
 }
  ngOnInit() {
    // remove previous listener
    this.socket.removeListener('updatechat');
    // chat recieved
    this.socket.on('updatechat', (user, contact, room, data) => {

      // alert(room);
      // remove read when msg recieved
      this.read.nativeElement.innerHTML = '';
      if (room === this.room) {
      if (String(user) === String(this.loginService.user)) {
        // sender
        this.FLAG_SENDER = true;
        // tslint:disable-next-line: max-line-length
        this.html = '<li style="height: 28px; width: 100%;text-align: right;"><span style="width: 150px;padding: 5px; margin:5px; height: auto;background: rgba(63, 81,181,0.4); border-radius: 2px;">' + data +
        '</span></li>';
        this.conversationList.nativeElement.insertAdjacentHTML('beforeend', this.html);
        } else {
        // reciever
        this.FLAG_SENDER = false;
        // tslint:disable-next-line: max-line-length
        this.html =  '<li style="height: 28px; width: 100%;text-align: left;"><span style="width: 150px;padding: 5px; margin:5px; height: auto;background: rgba(350, 350,350,1); border-radius: 2px;">' + data +
        '</span></li>';
        this.conversationList.nativeElement.insertAdjacentHTML('beforeend', this.html);

        this.socket.emit('sendVisibility', this.socketService.getVisibility(), room);

      }

    }
    });
//  sender will listen for visibility of reviever
    this.socket.on('getVisibility', (visibility, room) => {
  // update read
  if (visibility) {
    this.read.nativeElement.innerHTML = '&#10003;';
  } else {
    this.read.nativeElement.innerHTML = '';
  }

    });



}
  ngAfterViewInit(): void {
    this.inputBox.nativeElement.focus();
  }

}
