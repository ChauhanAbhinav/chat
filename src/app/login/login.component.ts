import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('error', {static: false}) error: ElementRef;

  FLAG_VALID = false;
  FLAG_OTP = false;
  form = this.fb.group({
  mobile: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
  countryCode: ['+91', [Validators.required]],
});
  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  onSubmit() {

    if (this.formValidator()) {


        this.loginService.login(this.form.value).subscribe(
        response => {
          if (response) {
           console.log(response.body);
           this.error.nativeElement.innerHTML = response.body;
          }
        },
        err => {
          console.log('Error:', err.error);
          this.error.nativeElement.innerHTML = err.error;
        });
        this.update_error();
        this.getOtp();

  } else { this.update_error(); }
}
  // form Validator
    formValidator() {
    this.FLAG_VALID = (this.form.valid) && (this.form.get('mobile').valid);
    return this.FLAG_VALID;
  }
  // otp
  getOtp() {
  setTimeout(() => {
  this.FLAG_OTP = true;
  this.form.addControl('otp', this.fb.control(''));
  this.form.get('otp').setValidators([Validators.required]);
}, 200);
}
// error updates
  update_error() {
  if (!this.FLAG_VALID) {
    console.log('Form is ' + this.FLAG_VALID);
    this.error.nativeElement.innerHTML  = 'Invalid Fields';
    } else { this.error.nativeElement.innerHTML = ''; }

}
  ngOnInit() {

  }

}
