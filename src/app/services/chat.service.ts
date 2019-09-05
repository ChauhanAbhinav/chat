import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseurl = 'http://localhost:3000';
  httpOptions = {
    observe: 'response',
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    }),
    // responseType:
  };
  constructor(private http: HttpClient) { }
  getUser(mobile) {
    return this.http.post(this.baseurl + '/getuser', {mobile}, {observe: 'response'});
      }
  getAllUsers(user) {
    return this.http.post(this.baseurl + '/userslist', {user}, {observe: 'response'});
    }
  addContact(contactModel, nameUser) {
    return this.http.post(this.baseurl + '/addContact', {contactModel, nameUser}, {observe: 'response'});
    }
  getAllContacts(user) {
    return this.http.post(this.baseurl + '/getallcontacts', {mobile: user}, {observe: 'response'});
    }
  getContact(user , contactName) {
    return this.http.post(this.baseurl + '/getcontactinfo', {mobile: user, contact: contactName}, {observe: 'response'});
    }
  deleteContact(user , contactName) {
    return this.http.post(this.baseurl + '/deletecontact', {mobile: user, contact: contactName}, {observe: 'response'});
    }
  createGroup(user , contacts, group) {
    return this.http.post(this.baseurl + '/creategroup', {mobile: user, selectedContacts: contacts, group}, {observe: 'response'});
    }
  getAllGroups(user) {
    return this.http.post(this.baseurl + '/grouplist', {mobile: user}, {observe: 'response'});
      }
  deleteGroup(user , group) {
    return this.http.post(this.baseurl + '/deletegroup', {mobile: user, group}, {observe: 'response'});
}
  getChat(room) {
  return this.http.post(this.baseurl + '/getchat', {room}, {observe: 'response'});
    }
}
