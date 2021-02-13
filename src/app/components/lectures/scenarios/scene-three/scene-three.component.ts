import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {QuestionDialogComponent} from '../../question-dialog/question-dialog.component';

@Component({
  selector: 'app-scene-three',
  templateUrl: './scene-three.component.html',
  styleUrls: ['./scene-three.component.css']
})
export class SceneThreeComponent implements OnInit, AfterViewInit {

  @ViewChild('scene3') scene3: ElementRef<HTMLVideoElement>;
  @ViewChild('star') star: ElementRef;

  noOfItems = 0;
  time = [16, 60, 72, 82];
  data = [
    {
      question: 'You go to her,  what would be the first thing that you would do?',
      options: [
        'Check the capillary refill.',
        'Assessment of the external visible wounds.',
        'Open the airway.',
        'Check for breathing.',
        'First 3 then 4.'
      ],
      answer: 'First 3 then 4.'
    },
    {
      question: 'What is the respiratory rate of the victim?',
      options: [
        '35 breaths/min',
        '26 breaths/min',
        '20 breaths/min',
        '40 breaths/min'
      ],
      answer: '20 breaths/min'
    },
    {
      question: 'What step would you take next?',
      options: [
        'Treat the shock.',
        'Wait for the cyanosis to fade away.',
        'Wait for help.'
      ],
      answer: 'Treat the shock.'
    },
    {
      question: 'What will you tag the victim?',
      options: [
        'Green',
        'Yellow',
        'Red',
        'Black'
      ],
      answer: 'Red'
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
    this.scene3.nativeElement.addEventListener('timeupdate', () => {
      let curTime = this.scene3.nativeElement.currentTime;
      if (curTime >= this.time[this.index] && this.index != this.time.length) {
        this.scene3.nativeElement.pause();
        this.dialog++;
        this.invoke();
      }
    });
    this.scene3.nativeElement.onended = () => {
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
      this.scene3.nativeElement.classList.add('animate__fadeOutDown');
      this.dialog = 0;
      this.questionDialog.open(QuestionDialogComponent, {
        maxWidth: 600,
        maxHeight: '100vh',
        panelClass: ['m-3', 'animate__animated', 'animate__fadeInDown'],
        disableClose: true,
        data: {question: this.data[this.index].question, options: this.data[this.index].options}
      }).afterClosed().subscribe(d => {
        this.scene3.nativeElement.classList.remove('animate__fadeOutDown');
        if (this.data[this.index].answer == d) {
          this.star.nativeElement.children[this.noOfItems - 1 - this.index].style.visibility = 'visible';
        }
        this.index++;
        this.scene3.nativeElement.play();
        this.dialog = 0;
      });
    }
  }

  next() {
    this.router.navigate(['/lectures/scene4']);
  }

  back() {
    this.router.navigate(['/lectures/scene2']);
  }

}
