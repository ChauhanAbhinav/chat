import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import { LoginService } from '../services/login.service';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  flag = true; otpInput = false;
  form = this.fb.group({
  mobile: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
});
  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  onSubmit() {
    console.log('Form valid?: ' + this.formValidator());

    if (this.formValidator()) {
      console.log('inside condition form validation  ');
      this.loginService.login(this.form.value).subscribe(
        response => {
          if (response.status === 200) {
           console.log(response);
           this.validateOtp();
          }
        },
        err => {
          console.log('Error:', err.error);
        });
    }
    }
  // form Validator
    formValidator() {
    this.flag = (this.form.valid) && (this.form.get('mobile').valid);
    return this.flag;
  }
  // otp
  validateOtp() {
  this.otpInput = true;
  this.form.addControl('otp', this.fb.control('', Validators.required));
  }

  ngOnInit() {
  }

}
