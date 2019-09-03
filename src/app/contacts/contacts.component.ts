import { Component, OnInit, Input} from '@angular/core';
import { ChatService } from './../services/chat.service';
import { SocketService} from './../services/socket.service';
import { NotificationService} from './../services/notification.service';
import { FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  private contacts;
  private form: FormGroup;
  private user: any = this.loginService.getLoggedUser();



  constructor(private chatService: ChatService, private loginService: LoginService,
              private router: Router, private fb: FormBuilder, private socketService: SocketService,
              private Notification: NotificationService) {
    this.form = fb.group({
    contacts: new FormArray([])
    });
    this.getContacts();
    this.Notification.notify = false;
    // Notification.contacts[] ;

  }


  // add check boxes
private addCheckboxes() {
    this.contacts.map((o, i) => {  // data, index
      const control = new FormControl(false); // initialized as unchecked
      (this.form.controls.contacts as FormArray).push(control);
    });
  }
  // start the chat
  private startChat(contact, room) {
    if ((typeof contact !== 'undefined') && (typeof room !== 'undefined')) {
      this.router.navigateByUrl('dashboard/private/' + contact + '/' + room);
   } else {
      alert('Not able to locate the room');
   }
  }
private createGroup() {
    let group = prompt('Choose a group name');
    group = String(group);
    const selectedContacts = this.form.value.contacts
      .map((v, i) => v ? this.contacts[i].contact : null)
      .filter(v => v !== null);
    console.log(group);
    this.chatService.createGroup(this.user, selectedContacts, group).subscribe(
      res => {
        // console.log('response', res);
        if (res.status === 200) {
          alert(res.body);
          this.router.navigateByUrl('dashboard/group/' + this.user + '/' + group);
        }
    },
     err => {
      if (err.error) {
        // console.log('Error:', err.error);
      }
       });

  }


  // get contact list
private getContacts() {this.chatService.getAllContacts(this.user).subscribe(
    res => {
       if (res.status === 200) {
        this.contacts = res.body;
        // console.log(this.contacts);
        this.addCheckboxes();
       }
    },
    err => {
      // console.log('Error:', err.error);
      });
 }


  // delete contact function
private deleteContact(contact, i, room) {

    this.chatService.deleteContact(this.user, contact).subscribe(
      res => {
         if (res.status === 200) {
          this.contacts = res.body;
          (this.form.controls.contacts as FormArray).clear();
          this.addCheckboxes();
          this.socketService.leaveRoom(contact, room);
         }
      },
      err => {
        if (err.status === 400) {
           // no user left
          delete this.contacts;
          this.socketService.leaveRoom(contact, room);
        } else {
          // console.log('Error:', err.status);
        }
        });
   }
  ngOnInit() {
  }

}
