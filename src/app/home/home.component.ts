import { Component, OnInit} from '@angular/core';
import { ViewChild, AfterViewInit, ElementRef } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('input', {static: false}) private elementRef: ElementRef;

  constructor() { }

  ngOnInit() {

    this.loadScript('../assets/socket.io/client/public-socket.io.js');
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
