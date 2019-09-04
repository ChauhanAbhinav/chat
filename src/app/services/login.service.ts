import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { ChatService } from './../services/chat.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseurl = 'http://localhost:3000';
  httpOptions = {
    observe: 'response',
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    }),
    // responseType:
  };
  public name;
  public user;
  constructor(private http: HttpClient, private cookieService: CookieService,  private router: Router, private chatService: ChatService) {
  }

  authenticate() {
    if (this.getLoggedUser()) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  login(mobile) {
    this.cookieService.set( 'user', mobile, 1, '/');  // take mobile as string, expires in 1 days
    this.router.navigateByUrl('/dashboard');
    this.user = mobile;
    this.name = this.getLoggedName(mobile);
  }
  getLoggedUser() {
    const cookieExists: boolean = this.cookieService.check('user');
    if (cookieExists) {
      this.user = Number(this.cookieService.get('user'));
      return this.user;
    }
    return false;
  }
  getLoggedName(user) {
    const cookieExists: boolean = this.cookieService.check('name');
    if (cookieExists) {
      this.name = this.cookieService.get('name');
      return this.name;
    } else {
      this.chatService.getUser(user).subscribe(
        res => {
          if (res.status === 200) {
            // console.log('res is ', res.body);
            for (let key in res.body) {
              if ((key === 'name')) {
                const name = String(res.body[key]);
                this.cookieService.set('name', name, 1, '/');
                this.name = name;
                return name;
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
  }

  logout() {
    this.cookieService.delete('user', '/');
    this.cookieService.delete('name', '/');
    this.name = '';
    this.user = '';
    this.router.navigateByUrl('/login');

  }
ifRegistered(data) {
  console.log(data);
  return this.http.post(this.baseurl + '/ifregistered', data, {observe: 'response'});
  }

registerUser(data) {
  console.log(data);
  return this.http.post(this.baseurl + '/register', data, {observe: 'response'});
  }

  sendToken(data) {
  console.log(data);
  return this.http.post(this.baseurl + '/sendToken', data, {observe: 'response'});
  }

  verifyToken(data) {
  console.log(data);
  return this.http.post(this.baseurl + '/verifyToken', data, {observe: 'response'});
  }

}
