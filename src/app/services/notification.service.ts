import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
public notify: boolean;
public contacts = [];

  constructor() {
    this.notify = false;
  }

}
