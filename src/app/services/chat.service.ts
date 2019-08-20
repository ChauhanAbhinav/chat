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
  getAllUsers() {
    return this.http.get(this.baseurl + '/userslist', {observe: 'response'});
    }
    createGroup(group){
      console.log(group);
      return this.http.post(this.baseurl + '/addgroup', {group: group}, {observe: 'response'});
    }
    getGroups(user) {
      return this.http.post(this.baseurl + '/getgroups', {user: user}, {observe: 'response'});
      }
}
