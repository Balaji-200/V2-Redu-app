import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../services/login/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {SuccessDialogComponent} from './success-dialog/success-dialog.component';
import {fakeAsync} from '@angular/core/testing';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token: string;
  username: string;
  errMess: string;
  resetForm: FormGroup;
  hidePass = true;
  hideConf = true;
  passMatch = true;
  processing = false;
  formErrors = {
    'password': '',
    'confirmPassword': ''
  };
  validationMessages = {
    'password': {
      'required': 'Password is required',
      'minlength': 'Password must be atleast 8 characters long.'
    },
    'confirmPassword': {
      'required': 'Confirm Password is required',
      'minlength': 'Confirm Password must be atleast 8 characters long.'
    }
  };

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService, private fb: FormBuilder, public dialog: MatDialog) {
    this.CreateForm();
  }

  CreateForm() {
    this.resetForm = this.fb.group({
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirmPassword': ['', [Validators.required, Validators.minLength(8)]]
    });
    this.resetForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  ngOnInit(): void {
    this.verifyLink();
  }

  verifyLink() {
    localStorage.setItem('j','')
    this.route.queryParams.subscribe(params => {
      if (params['token']) {
        this.token = params['token'];
        this.loginService.verifyResetLink(this.token).subscribe(res => {
            if (res.success) {
              this.username = res.username;
            } else {
              this.errMess = res.message;
            }
          }, err => this.router.navigate(['login'])
        );
      } else {
        this.router.navigate(['resetPassword']);
      }
    });
  }

  resetPassword() {
    if (this.resetForm.valid) {
      if (this.resetForm.value['password'] === this.resetForm.value['confirmPassword']) {
        this.processing = true
        this.loginService.resetPassword({'username': this.username, 'password': this.resetForm.value['password']}).subscribe(res => {
          this.processing = false;
          this.dialog.open(SuccessDialogComponent, {
            maxWidth: 600,
            disableClose: true
          });
        }, error => this.router.navigate(['login']));
      } else {
        this.passMatch = false;
      }
    }
  }

  onValueChanged(data?: any) {
    if (!this.resetForm) {
      return this.resetForm;
    }
    const form = this.resetForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
