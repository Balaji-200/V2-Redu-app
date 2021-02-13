import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {QuestionDialogComponent} from '../../question-dialog/question-dialog.component';

@Component({
  selector: 'app-scene-four',
  templateUrl: './scene-four.component.html',
  styleUrls: ['./scene-four.component.css']
})
export class SceneFourComponent implements OnInit, AfterViewInit {

  @ViewChild('scene4') scene4: ElementRef<HTMLVideoElement>;
  @ViewChild('star') star: ElementRef;

  time = [15, 58, 65, 72];
  data = [
    {
      question: 'What would be the first thing that you would do?',
      options: [
        'Observe for cyanosis',
        'Check for breathing',
        'Cheek for facial scars',
        'Both A and B.'
      ],
      answer: 'Both A and B.'
    },
    {
      question: 'What is the respiratory rate of the infant?',
      options: [
        '14 breaths/min',
        '22 breaths/min',
        '30 breaths/min',
        '35 breaths/min'
      ],
      answer: '30 breaths/min'
    },
    {
      question: 'You inspect his facial scars. What do you find?',
      options: [
        'Moderate',
        'Mild',
        'Severe'
      ],
      answer: 'Mild'
    },
    {
      question: 'What will you tag the victim?',
      options: [
        'Green',
        'Yellow',
        'Red',
        'Black'
      ],
      answer: 'Yellow'
    }
  ];
  dialog = 0;
  index = 0;
  noOfItems: 0;

  constructor(private router: Router, private questionDialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.noOfItems = this.star.nativeElement.children.length;
    for (let i = 0; i < this.noOfItems; i++) {
      this.star.nativeElement.children[i].style.visibility = 'hidden';
    }
    this.scene4.nativeElement.addEventListener('timeupdate', () => {
      let curTime = this.scene4.nativeElement.currentTime;
      if (curTime >= this.time[this.index] && this.index != this.time.length) {
        this.scene4.nativeElement.pause();
        this.dialog++;
        this.invoke();
      }
    });
    this.scene4.nativeElement.onended = () => {
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
      this.scene4.nativeElement.classList.add('animate__fadeOutDown');
      this.dialog = 0;
      this.questionDialog.open(QuestionDialogComponent, {
        maxWidth: 600,
        maxHeight: '100vh',
        panelClass: ['m-3', 'animate__animated', 'animate__fadeInDown'],
        disableClose: true,
        data: {question: this.data[this.index].question, options: this.data[this.index].options}
      }).afterClosed().subscribe(d => {
        this.scene4.nativeElement.classList.remove('animate__fadeOutDown');
        if (this.data[this.index].answer == d) {
          this.star.nativeElement.children[this.noOfItems - 1 - this.index].style.visibility = 'visible';
        }
        this.index++;
        this.scene4.nativeElement.play();
        this.dialog = 0;
      });
    }
  }

  next() {
    this.router.navigate(['/lectures/scene5']);
  }

  back() {
    this.router.navigate(['/lectures/scene3']);
  }

}
