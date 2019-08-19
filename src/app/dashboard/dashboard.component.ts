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
  ngOnInit() {
    // this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js');
    // this.loadScript('https://code.jquery.com/jquery-1.11.1.js');
    // this.loadScript('../assets/socket.io/socket.io-client.js');
  }
  public loadScript(url: string) {
    const body = document.body as HTMLDivElement;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

}
