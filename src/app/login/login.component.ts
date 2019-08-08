import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
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
  constructor(private fb: FormBuilder) { }
  onSubmit() {
    console.log(this.formValidator());
    }
  formValidator() {
    this.flag = (this.form.valid) && (this.form.get('mobile').valid);
    return this.flag;
  }

  ngOnInit() {
  }

}
