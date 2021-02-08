import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignupService} from '../../services/signup/signup.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;
  hideConfirm = true;
  signUpForm: FormGroup;
  resetPassword: boolean = false;
  response = '';
  submit: boolean = false;
  formErrors = {
    'username': '',
    'email': '',
    'nameOfInstitute': '',
    'password': '',
    'confirmPassword': '',
    'passNotValid': ''
  };
  validationMessages = {
    'username': {
      'required': 'Username is required',
      'minlength': 'Username must be atleast 4 characters long.'
    },
    'email': {
      'required': 'Email is required',
      'email': 'Invalid Email format'
    },
    'nameOfInstitute': {
      'required': 'Name of your Institue is required',
      'minlength': 'Must be atleast 8 characters long.'
    },
    'password': {
      'required': 'Password is required',
      'minlength': 'Password must be atleast 8 characters long.'
    },
    'confirmPassword': {
      'required': 'Password is required',
      'minlength': 'Password must be atleast 8 characters long.',
      'notValid': 'Password & confirm password is not same.'
    }
  };

  constructor(private fb: FormBuilder, private signUpService: SignupService, private router: Router) {
    this.CreateForm();
  }

  ngOnInit() {
  }

  CreateForm() {
    this.signUpForm = this.fb.group({
      'username': ['', [Validators.required, Validators.minLength(4)]],
      'nameOfInstitute': ['', [Validators.required, Validators.minLength(8)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirmPassword': ['', [Validators.required, Validators.minLength(8)]]
    });
    this.signUpForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.signUpForm) {
      return;
    }
    const form = this.signUpForm;
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

  SignUp() {
    if ((this.signUpForm.value.password == this.signUpForm.value.confirmPassword) && this.signUpForm.valid) {
      delete this.signUpForm.value['confirmPassword'];
      this.submit = true;
      this.signUpService.signUp(this.signUpForm.value).subscribe(res => {
          this.response = res;
        }, err => this.router.navigate(['/'])
      );
    } else {
      this.formErrors['passNotValid'] = this.validationMessages.confirmPassword['notValid'];
      return;
    }
  }
}
