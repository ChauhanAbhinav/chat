import { Component, OnInit } from '@angular/core';
import { ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, AfterViewInit {
  private group: any;
  private user: any;
  @ViewChild('input', {static: false}) private elementRef: ElementRef;

  constructor(private route: ActivatedRoute, private cookieService: CookieService) {
    this.user = route.snapshot.params.contact;
    this.group = route.snapshot.params.group;

    // console.log(contact);
    // this.cookieService.delete( 'contact');
    // this.cookieService.set( 'contact', this.contact , 1);
    // this.cookieService.delete('group');
    // this.cookieService.set('group', this.group, 1);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }

}
