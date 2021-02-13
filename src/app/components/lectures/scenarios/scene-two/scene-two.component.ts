import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {QuestionDialogComponent} from '../../question-dialog/question-dialog.component';

@Component({
  selector: 'app-scene-two',
  templateUrl: './scene-two.component.html',
  styleUrls: ['./scene-two.component.css']
})
export class SceneTwoComponent implements OnInit, AfterViewInit {

  @ViewChild('scene2') scene2: ElementRef<HTMLVideoElement>;
  @ViewChild('star') star: ElementRef;

  noOfItems = 0;
  time = [13, 34, 45.5, 50];
  data = [
    {
      question: 'What will you do?',
      options: [
        'Assess his condition.',
        'Look for another patient.'
      ],
      answer: 'Assess his condition.'
    },
    {
      question: 'Is he oriented?',
      options: ['Yes', 'No'],
      answer: 'Yes'
    },
    {
      question: 'Is he gasping and is there any visible cyanosis?',
      options: ['Yes', 'No'],
      answer: 'Yes'
    },
    {
      question: 'What will you tag the victim? ',
      options: ['Green', 'Yellow', 'Red ', 'Black'],
      answer: 'Yellow'
    }
  ];
  dialog = 0;
  index = 0;

  constructor(private router: Router, private questionDialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.noOfItems = this.star.nativeElement.children.length;
    for (let i = 0; i < this.noOfItems; i++) {
      this.star.nativeElement.children[i].style.visibility = 'hidden';
    }
    this.scene2.nativeElement.addEventListener('timeupdate', () => {
      let curTime = this.scene2.nativeElement.currentTime;
      if (curTime >= this.time[this.index] && this.index != this.time.length) {
        this.scene2.nativeElement.pause();
        this.dialog++;
        this.invoke();
      }
    });
    this.scene2.nativeElement.onended = () => {
      this.index = 0;
      for (let i = 0; i < this.noOfItems; i++) {
        this.star.nativeElement.children[i].style.visibility = 'hidden';
      }
    };
  }

  ngOnInit(): void {
  }

  invoke() {
    if (this.dialog > 1) {
      this.scene2.nativeElement.classList.add('animate__fadeOutDown');
      this.dialog = 0;
      this.questionDialog.open(QuestionDialogComponent, {
        maxWidth: 600,
        maxHeight: '100vh',
        panelClass: ['m-3', 'animate__animated', 'animate__fadeInDown'],
        disableClose: true,
        data: {question: this.data[this.index].question, options: this.data[this.index].options}
      }).afterClosed().subscribe(d => {
        this.scene2.nativeElement.classList.remove('animate__fadeOutDown');
        if (this.data[this.index].answer == d) {
          this.star.nativeElement.children[this.noOfItems - 1 - this.index].style.visibility = 'visible';
        }
        this.index++;
        this.scene2.nativeElement.play();
        this.dialog = 0;
      });
    }
  }

  next() {
    this.router.navigate(['/lectures/scene3']);
  }

  back() {
    this.router.navigate(['/lectures/scene1']);
  }


}
