import { Injectable } from '@angular/core';
import { PublicComponent } from '../public/public.component'
import {
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements  CanDeactivate<PublicComponent> {

  constructor() { }
  canDeactivate(component: PublicComponent) {
    // if ( window.confirm('Are you sure you want to leave the room?')) {
      // console.log('inside deactivate, Allowed');
      // // load disconnect script
      // this.loadScript('../assets/socket.io/client/close-connection.js');
      // return true;
    // } else {
    //   console.log('inside deactivate, Not Allowed');
    //   return false;
    // }
    this.loadScript('../assets/socket.io/client/close-connection.js');
    return true;
  }
  // load script function
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
