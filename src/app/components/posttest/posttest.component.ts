import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as data from './posttest.json';
import {PosttestService} from '../../services/posttest/posttest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-posttest',
  templateUrl: './posttest.component.html',
  styleUrls: ['./posttest.component.css']
})
export class PosttestComponent implements OnInit {

  posttest: any = data;
  questions = this.posttest.default;
  posttestForm = new FormGroup({});
  formValid = true;
  processingPost = false;
  canGiveTest = false;
  testDate: string;

  constructor(private postTestService: PosttestService, private router: Router) {
    this.processingPost = true;
    if (localStorage.getItem('pos') == null || localStorage.getItem('pos') == '' || localStorage.getItem('pos') == 'false') {
      this.postTestService.getPostTest().subscribe(res => {
        if (res.questions.length > 0) {
          localStorage.setItem('pos', 'true');
          this.router.navigate(['dashboard/result']);
        } else {
          localStorage.setItem('pos', 'false');
          if(localStorage.getItem('testDate') == null || localStorage.getItem('testDate') == ''){
            localStorage.setItem('testDate', res.testDate);
          }
          let current = Date.now()
          if(Date.parse(localStorage.getItem('testDate')) > current){
            this.canGiveTest = true
            this.processingPost = false;
          }else{
            this.canGiveTest = false
            let currentDate = new Date(current)
            let setDate =  new Date(Date.parse(localStorage.getItem('testDate')));
            this.testDate = `${setDate.getDate() - currentDate.getDate()} days ${setDate.getHours() - currentDate.getHours()} hours remaining for Test.`
            this.processingPost = false;
          }
        }
        this.processingPost = false;
      }, err => this.router.navigate(['/']));
    }
    this.questions.forEach(q => {
      this.posttestForm.addControl(q.question, new FormControl(['', Validators.required]));
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.questions.forEach(q => {
      let err = this.posttestForm.controls[`${q.question}`].touched;
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
            'answer': this.posttestForm.controls[`${q.question}`].value,
            'correctAnswer': q.answer
          }
        );
      });
      this.postTestService.postPostTest(response).subscribe(res => {
        localStorage.setItem('pos', 'true');
        this.processingPost = false;
        this.router.navigate(['/dashboard/result']);
      }, err => this.router.navigate(['/']));
    }
  }
}
