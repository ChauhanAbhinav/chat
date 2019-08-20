import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {
  loginService.authenticate();
  }
  logout() {
    this.loginService.logout();
  }
  ngOnInit() {

  }
}
