import { Component, OnInit } from '@angular/core';
import { ChatService } from './../services/chat.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


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
              private router: Router, private cookieService: CookieService, private fb: FormBuilder) {

    this.form = fb.group({
    contacts: new FormArray([])
    });

    this.getContacts();
  }


  // add check boxes
private addCheckboxes() {
    this.contacts.map((o, i) => {  // data, index
      const control = new FormControl(false); // initialized as unchecked
      (this.form.controls.contacts as FormArray).push(control);
      // console.log(o);
    });
  }


private submit() {

    const selectedContactsIds = this.form.value.contacts
      .map((v, i) => v ? this.contacts[i].contact : null)
      .filter(v => v !== null);
    console.log(selectedContactsIds);
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
      console.log('Error:', err.error);
      });
 }


  // delete contact function
private deleteContact(contact, i) {
    this.chatService.deleteContact(this.user, contact).subscribe(
      res => {
         if (res.status === 200) {
          this.contacts = res.body;
          (this.form.controls.contacts as FormArray).clear();
          this.addCheckboxes();
         }
      },
      err => {
        if (err.status === 400) {
           // no user left
          delete this.contacts;
        } else {
          console.log('Error:', err.status);
          alert('Error: ' + err.error);
        }
        });
   }


   // start the chat
 private startChat(contact, room) {
  // console.log(room);
  if ((typeof contact !== 'undefined') && (typeof room !== 'undefined')) {
    this.router.navigateByUrl('dashboard/private/' + contact + '/' + room);
 } else {
    alert('Not able to locate the room');
 }
}
private checkType(data) {
  return typeof data;
}
  ngOnInit() {
  }

}
