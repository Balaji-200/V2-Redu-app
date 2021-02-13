import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Form, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent implements OnInit {

  question: string;
  options: Array<string>;
  // questionForm = new FormGroup({});
  formInValid = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private questiondialogRef: MatDialogRef<QuestionDialogComponent>) {
    this.question = data.question;
    this.options = data.options;
    this.formInValid = false;
    // this.questionForm.addControl(this.question, new FormControl(['', Validators.required]));
  }

  ngOnInit(): void {
  }

  submit(questionForm: NgForm) {
    if (questionForm.valid) {
      this.formInValid = false;
      this.questiondialogRef.close(questionForm.value[this.question]);
    } else {
      this.formInValid = true;
    }
  }
}
