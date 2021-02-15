import {Component, OnInit} from '@angular/core';
import * as data from './pretest.json';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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

  constructor(private preTestService: PretestService, private router: Router) {
    this.processingPost = true;
    if (localStorage.getItem('pre') == null || localStorage.getItem('pre') == '' || localStorage.getItem('pre') == 'false') {
      this.preTestService.getPretest().subscribe(res => {
        if (res.questions.length > 0) {
          localStorage.setItem('pre', 'true');
          this.router.navigate(['lectures']);
        } else {
          localStorage.setItem('pre', 'false');
        }
        this.processingPost = false;
      }, err => this.router.navigate(['/']));
    }
    this.questions.forEach(q => {
      this.pretestForm.addControl(q.question, new FormControl(['', Validators.required]));
    });
  }

  ngOnInit(): void {

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
            'answer': this.pretestForm.controls[`${q.question}`].value,
            'correctAnswer': q.answer
          }
        );
      });
      this.preTestService.postPretest(response).subscribe(res => {
        localStorage.setItem('pre', 'true');
        this.processingPost = false;
        this.router.navigate(['lectures']);
      }, err => this.router.navigate(['/']));
    }
  }

}
