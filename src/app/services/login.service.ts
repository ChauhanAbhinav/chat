import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseurl = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    }),
    // responseType:
  };
  constructor(private http: HttpClient) {
  }
 login(data) {
console.log(data);
return this.http.post(this.baseurl + '/api', data, this.httpOptions);
  }
}
