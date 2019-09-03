import { Injectable } from '@angular/core';
import { ChatService } from './../services/chat.service';
import { LoginService } from '../services/login.service';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private user;
  public socket;

  constructor( private chatService: ChatService, private loginService: LoginService) {
    }
    // connect function
    public connect(successCallback) {

      this.socket = io('http://localhost:3000/private'); // initializes the socket
      this.socket.on('connect', () => {
        this.user = this.loginService.getLoggedUser();
        this.socket.emit('username', this.user);
        // alert('connected');
        this.joinAllRooms(successCallback);
      });
    }
    // join in all rooms of all contacts
    public joinAllRooms(successCallback) {
// console.log('join room payload:'+this.user);
      this.chatService.getAllContacts(this.user).subscribe(
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
                this.socket.emit('joinRoom', this.user, contact.contact, contact.room);
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
  this.user = this.loginService.getLoggedUser();
  this.socket.emit('joinRoom', this.user, contact, room);
}
public leaveRoom(contact, room) {
  // alert('inside leave');
  this.user = this.loginService.getLoggedUser();
  this.socket.emit('leaveRoom', this.user, contact, room);
}

public disconnect() {
  this.socket.disconnect();
}

 }

