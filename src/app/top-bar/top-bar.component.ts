import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private loginService: LoginService) {
  }
  logout() {
    this.loginService.logout();
  }
  ngOnInit() {
  }

}
