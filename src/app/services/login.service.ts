import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';

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
  constructor(private http: HttpClient, private cookieService: CookieService,  private router: Router) {}

  authenticate() {
    if (this.getLoggedUser()) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  login(mobile) {
    this.cookieService.set( 'user', mobile, 1);  // take mobile as string, expires in 1 days
    this.router.navigateByUrl('/dashboard');

  }
  getLoggedUser() {
    const cookieExists: boolean = this.cookieService.check('user');
    if (cookieExists) {
     return Number(this.cookieService.get('user'));
    }
    return false;
  }

  logout() {
    this.cookieService.delete('user');
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
