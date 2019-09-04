import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild('log', {static: false}) error: ElementRef;
  private form;
  constructor(private fb: FormBuilder, private loginService: LoginService,  private router: Router) {

    this.form = this.fb.group({
      name: [this.loginService.name, [Validators.required]],
    });
  }
private onSubmit() {
if (this.form.valid) {

this.loginService.editDetails({mobile: this.loginService.user, name: this.form.value.name}).subscribe(
  (res) => {
    if (res.status === 200) {
      this.loginService.updateUser({mobile: this.loginService.user, name: this.form.value.name});
      this.router.navigateByUrl('/dashboard');
      // alert('update success');
    }
  },
  (err) => {
    alert('Not success');
  }
);
} else {

}
}
// error updates
private update_error() {
  if (!this.form.valid) {
    this.error.nativeElement.innerHTML  = 'Invalid Fields';
    } else { this.error.nativeElement.innerHTML = ''; }

}
  ngOnInit() {
  }

}
