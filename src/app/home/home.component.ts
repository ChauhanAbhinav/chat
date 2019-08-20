import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js');
    // this.loadScript('https://code.jquery.com/jquery-1.11.1.js');
    this.loadScript('../assets/socket.io/client/public-socket.io.js');
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
