import { Component, OnInit} from '@angular/core';
import { ViewChild, AfterViewInit, ElementRef } from '@angular/core';
@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit, AfterViewInit {

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
