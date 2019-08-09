import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  flag = true;
  form = this.fb.group({
  mobile: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]]
});
  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  onSubmit() {
    console.log('Form valid?: ' + this.formValidator());

    if (this.formValidator()) {
      console.log('inside condition form validation  ');
      this.loginService.login(this.form.value).subscribe(
        res => {
          // console.log('[POST] localhost:3000/login: ' + JSON.stringify(res));
        },
        err => {
          console.log('Error:', err.error);
        });
    }
    }
  formValidator() {
    this.flag = (this.form.valid) && (this.form.get('mobile').valid);
    return this.flag;
  }

  ngOnInit() {
  }

}
