import { Component, OnInit} from '@angular/core';
import { ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit, AfterViewInit {

  @ViewChild('input', {static: false}) private elementRef: ElementRef;

  constructor(private route: ActivatedRoute, private cookieService: CookieService) {
    const group = route.snapshot.params.group;
    this.cookieService.delete( 'group');
    this.cookieService.set( 'group', group, 1);
   }

  ngOnInit() {
    this.loadScript('../assets/socket.io/client/private-socket.io.js');
  }
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
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
