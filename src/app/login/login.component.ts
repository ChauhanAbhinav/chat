import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('log', {static: false}) error: ElementRef;
  FLAG_COOKIE: boolean;
  FLAG_VALID = false;
  FLAG_TOKEN = false;
  FLAG_NAME = false;
  cookieValue;
  form = this.fb.group({
  mobile: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
  countryCode: ['+91', [Validators.required]],
});
  constructor(private fb: FormBuilder, private loginService: LoginService) {
    // loginService.authenticate();
  }

  onSubmit() {

    if (this.formValidator()) {

      if (!this.form.value.token) {
      // sending token
        this.checkUser(this.form.value, false);

        this.error.nativeElement.innerHTML = 'Sending token on given mobile number';
      } else {
        // verify token sent
      this.verifyToken(this.form.value);
      }
  } else { this.update_error(); }

// submit end
}
  // form Validator
    formValidator() {
    this.FLAG_VALID = (this.form.valid) && (this.form.get('mobile').valid);
    return this.FLAG_VALID;
  }

  // registrtion process function
  registerUser(user) {
        //  check registeration user
        delete user.token;
        this.loginService.registerUser(user).subscribe(
          res => {
             if (res.status === 200) {
              // console.log(res.body);
              this.error.nativeElement.innerHTML = res.body;
              this.loginService.login(user.mobile);
            }
          },
          err => {
            // console.log('Error:', err.error);
            this.error.nativeElement.innerHTML = err.error;
            });
  }
checkUser(user, register) {
   //  check registeration user
   this.loginService.ifRegistered(user).subscribe(
    res => {
       if (res.status === 200) {
        // console.log(res.body);
        this.error.nativeElement.innerHTML = res.body;
        if (register) {
        this.loginService.login(user.mobile);
        } else {
          this.sendToken(this.form.value, false);
        }
      }
    },
    err => {
      if (err.status === 404) {
      this.error.nativeElement.innerHTML = 'User not registered';
      if (register) {
        setTimeout(() => {
          this.registerUser(user);
        }, 0);
        } else {
          this.sendToken(this.form.value, true);
        }

      // console.log(err.error);
      } else {
      this.error.nativeElement.innerHTML = 'Error:' + err.error;
      // console.log('Error:', err.error);
      }
      });
}

  // send token function
 sendToken(user, name) {
   this.loginService.sendToken(user).subscribe(
    response => {
      if (response.status === 200) {
      // console.log(response.body);
      this.error.nativeElement.innerHTML = response.body;
      this.setTokenInput();
      if (name) {
      this.setNameInput();
      }
      }
    },
    error => {
      // console.log('Error:', error.error);
      this.error.nativeElement.innerHTML = error.error;
    }
  );
 }
 // varify token function
 verifyToken(user) {
           this.loginService.verifyToken(user).subscribe(
            response => {
              if (response.status === 200) {
              // console.log(response.body);
              this.error.nativeElement.innerHTML = response.body;
              setTimeout(() => {
                this.checkUser(user, true);
              }, 300);
               }
            },
            error => {
              console.log('Error:', error.error);
              this.error.nativeElement.innerHTML = error.error;
            }
          );
 }
  // set Token function
  setTokenInput() {
    this.FLAG_TOKEN = true;
    this.form.addControl('token', this.fb.control(''));
    this.form.get('token').setValidators([Validators.required]);
  }
   // set Name function
   setNameInput() {
    this.FLAG_NAME = true;
    this.form.addControl('name', this.fb.control(''));
    this.form.get('name').setValidators([Validators.required]);
  }
// error updates
  update_error() {
  if (!this.FLAG_VALID) {
    // console.log('Form is ' + this.FLAG_VALID);
    this.error.nativeElement.innerHTML  = 'Invalid Fields';
    } else { this.error.nativeElement.innerHTML = ''; }

}

ngOnInit() {

  }

}
