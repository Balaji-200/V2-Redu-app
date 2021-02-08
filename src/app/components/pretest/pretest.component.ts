import {Component, OnInit} from '@angular/core';
import * as data from './pretest.json';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PretestService} from '../../services/pretest/pretest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pretest',
  templateUrl: './pretest.component.html',
  styleUrls: ['./pretest.component.css']
})
export class PretestComponent implements OnInit {

  pretest: any = data;
  questions = this.pretest.default;
  pretestForm = new FormGroup({});
  formValid = true;
  processingPost = false;

  constructor(private pretestService: PretestService, private router: Router) {
    if(localStorage.getItem('pre') == null || localStorage.getItem('pre') == '') {
      this.processingPost = true;
      this.pretestService.getPretest().subscribe(res => {
        if (res.questions.length > 0) {
          localStorage.setItem('pre', 'true');
          this.router.navigate(['dashboard/lectures']);
        } else
          localStorage.setItem('pre', 'false');
        this.processingPost = false;
      }, error =>  this.router.navigate(['login']));
    }
    this.questions.forEach(q => {
      this.pretestForm.addControl(q.question, new FormControl(['', Validators.required]));
    });
  }

  onSubmit() {
    this.questions.forEach(q => {
      let err = this.pretestForm.controls[`${q.question}`].touched;
      if (!err) {
        this.formValid = false;
      }
    });
    if (!this.formValid) {
      return;
    } else {
      this.processingPost = true;
      let response = [];
      this.questions.forEach(q => {
        response.push(
          {
            'question': q.question,
            'answer': this.pretestForm.controls[`${q.question}`].value
          }
        );
      });
      this.pretestService.postPretest(response).subscribe(res => {
        localStorage.setItem('pre', 'true');
        this.processingPost = false;
        this.router.navigate(['/dashboard/posttest']);
      }, err => this.router.navigate(['/']));
    }
  }

  ngOnInit(): void {
  }

}
