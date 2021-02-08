import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  resetPassword: boolean = false;
  resetMess : string;
  processingReset: boolean = false;
  loginError = false;
  loggingIn = false;
  formErrors = {
    'email': '',
    'password': ''
  };
  validationMessages = {
    'email': {
      'required': 'Email is required',
      'email': 'Invalid Email format'
    },
    'password': {
      'required': 'Password is required',
      'minlength': 'Password must be atleast 8 characters long.'
    }
  };

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.CreateForm();
  }

  ngOnInit() {
  }

  CreateForm() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8)]]
    });
    this.loginForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
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

  Login() {
    if (this.loginForm.valid) {
      this.loggingIn = true;
      this.loginService.login(this.loginForm.value).subscribe(res => {
        if (res.success) {
          localStorage.setItem('j', res.token);
          this.loggingIn = false;
          this.router.navigate(['/dashboard/pretest']);
        }
      }, err => this.loginError = true);
    }
  }

  resetPass() {
    this.processingReset = true;
    this.loginService.resetLink({'email': this.loginForm.value.email}).subscribe(res => {
      this.resetMess = res;
    }, error => {
      this.resetMess = error.error;
    });
  }
}
