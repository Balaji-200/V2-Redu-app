import { Component, OnInit } from '@angular/core';
import * as data from './demographic.json';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DemographicDataService} from '../../services/demographic/demographic-data.service';

@Component({
  selector: 'app-demographic',
  templateUrl: './demographic.component.html',
  styleUrls: ['./demographic.component.css']
})
export class DemographicComponent implements OnInit {

  demo: any = data;
  questions = this.demo.default;
  demographicForm = new FormGroup({});
  formValid = true;
  processingPost = false;

  constructor(private demographicService: DemographicDataService, private router: Router) {
    if(localStorage.getItem('demo') == null || localStorage.getItem('demo') == '') {
      this.processingPost = true;
      this.demographicService.getDemographic().subscribe(res => {
        if (res.questions.length > 0) {
          localStorage.setItem('demo', 'true');
          this.router.navigate(['dashboard/lectures']);
        } else
          localStorage.setItem('demo', 'false');
        this.processingPost = false;
      }, error =>  this.router.navigate(['/']));
    }
    this.questions.forEach(q => {
      this.demographicForm.addControl(q.question, new FormControl(['', Validators.required]));
    });
  }

  onSubmit() {
    this.questions.forEach(q => {
      let err = this.demographicForm.controls[`${q.question}`].touched;
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
            'answer': this.demographicForm.controls[`${q.question}`].value
          }
        );
      });
      this.demographicService.postDemographic(response).subscribe(res => {
        localStorage.setItem('demo', 'true');
        this.processingPost = false;
        this.router.navigate(['/dashboard/pretest']);
      }, err => this.router.navigate(['/']));
    }
  }

  ngOnInit(): void {
  }


}
