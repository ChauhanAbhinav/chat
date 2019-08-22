import { Component, OnInit} from '@angular/core';
import { ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit, AfterViewInit {
  private contact: any;
  private room: any;

  @ViewChild('input', {static: false}) private elementRef: ElementRef;

  constructor(private route: ActivatedRoute, private cookieService: CookieService) {
    this.contact = route.snapshot.params.contact;
    this.room = route.snapshot.params.room;

    // console.log(contact);
    this.cookieService.delete( 'contact');
    this.cookieService.set( 'contact', this.contact , 1);
    this.cookieService.delete( 'room');
    this.cookieService.set( 'room', this.room , 1);
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
