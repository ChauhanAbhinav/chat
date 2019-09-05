import { Injectable } from '@angular/core';
import { ChatService } from './../services/chat.service';
import { LoginService } from '../services/login.service';
import * as io from 'socket.io-client';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket;

  constructor( private chatService: ChatService, private loginService: LoginService, private route: ActivatedRoute) {
    }
    // connect function
    public connect(successCallback) {

      this.socket = io('http://localhost:3000/private'); // initializes the socket
      this.socket.on('connect', () => {
        this.loginService.user = this.loginService.getLoggedUser();
        this.socket.emit('username', this.loginService.user);
        // alert('connected');
        this.joinAllRooms(successCallback);
      });
    }
    // join in all rooms of all contacts
    public joinAllRooms(successCallback) {
      this.chatService.getAllContacts(this.loginService.user).subscribe(
      res => {
         if (res.status === 200) {
          this.createRooms(res.body, successCallback);
         }
      },
      err => {
        console.log('Error:', err.error);
        this.notificationListeners(successCallback);
        });
   }
private createRooms(contacts , successCallback) {
  // alert('inside create room');
  contacts.forEach((contact, index) => {
                this.socket.emit('joinRoom', this.loginService.user, contact.contact, contact.room);
                if (contacts.length === (index + 1)) {
                  // alert(contacts.length);
                  this.notificationListeners(successCallback);
                }
                });

}
public notificationListeners(successCallback) {
  // global listeners
  // alert('global listener')
  this.socket.on('notificationAlert', (user, contact, room, data) => {
    successCallback(user, contact, room, data);
  });
}
public joinRoom(contact, room) {
  this.loginService.user = this.loginService.getLoggedUser();
  this.socket.emit('joinRoom', this.loginService.user, contact, room);
}
public deleteRoom(contact, room) {
  // alert('inside leave');
  this.loginService.user = this.loginService.getLoggedUser();
  this.socket.emit('deleteRoom', this.loginService.user, contact, room);
}

public disconnect() {
  this.socket.disconnect();
}
// visibility api ========================================================

public getVisibility = () => {
   const path = window.location.pathname.split('/')[2];
   if (document.visibilityState === 'visible' && path === 'private') {
     return true;
 } else { return false; }
 }
 }

