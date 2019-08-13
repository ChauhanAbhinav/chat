import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  FLAG_VALID = false;
  FLAG_OTP = false;
  FLAG__ERROR = false;
  form = this.fb.group({
  mobile: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
  countryCode: ['+91', [Validators.required]],
});
  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  onSubmit() {

    if (!this.FLAG_VALID) {
    console.log('Form is ' + this.FLAG_VALID);
    }

    if (this.formValidator()) {

      this.loginService.login(this.form.value).subscribe(
        response => {
          if (response.status === 200) {
           console.log(response.body);
           this.getOtp();
          }
        },
        err => {
          console.log('Error:', err.error);
          // this.FLAG__ERROR = true;
        });
    }
    }
  // form Validator
    formValidator() {
    this.FLAG_VALID = (this.form.valid) && (this.form.get('mobile').valid);
    return this.FLAG_VALID;
  }
  // otp
  getOtp() {
  this.FLAG_OTP = true;
  this.form.addControl('otp', this.fb.control(''));
  this.form.get('otp').setValidators([Validators.required]);
  }

  ngOnInit() {
  }

}
