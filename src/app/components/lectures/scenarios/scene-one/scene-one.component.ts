import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {QuestionDialogComponent} from '../../question-dialog/question-dialog.component';

@Component({
  selector: 'app-scene-one',
  templateUrl: './scene-one.component.html',
  styleUrls: ['./scene-one.component.css']
})
export class SceneOneComponent implements OnInit, AfterViewInit {

  @ViewChild('scene1') scene1: ElementRef<HTMLVideoElement>;
  @ViewChild('star') star: ElementRef;
  noOfItems = 0;
  time = [14, 32, 45, 54];
  data = [
    {
      question: 'What would be the foremost thing that you would do before going to each patient? ',
      options: [
        'You assess the disaster site for more than 5 mins.',
        'You wait for someone to come for help.',
        'You give voice commands.',
        'None of the above.'
      ],
      answer: 'You give voice commands.'
    },
    {
      question: 'What will you do?',
      options: [
        'You will directly tag the clients.',
        'You will make a quick assessment of the victim to rule out any complications and then tag.',
        'You will perform all the assessment from head to toe.',
        'None of the above.'
      ],
      answer: 'You will make a quick assessment of the victim to rule out any complications and then tag.'
    },
    {
      question: 'What will you tag the victim?',
      options: [
        'Green',
        'Yellow',
        'Red',
        'Black'
      ],
      answer: 'Green'
    },
    {
      question: 'How much time should be given to each victim for a quick complete assessment?',
      options: [
        '>30 secs',
        '30 secs',
        '20 secs',
        '<30 secs'
      ],
      answer: '<30 secs'
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
    this.scene1.nativeElement.addEventListener('timeupdate', () => {
      let curTime = this.scene1.nativeElement.currentTime;
      if (curTime >= this.time[this.index] && this.index != this.time.length) {
        this.scene1.nativeElement.pause();
        this.dialog++;
        this.invoke();
      }
    });
    this.scene1.nativeElement.onended = () => {
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
      this.scene1.nativeElement.classList.add('animate__fadeOutDown');
      this.dialog = 0;
      this.questionDialog.open(QuestionDialogComponent, {
        maxWidth: 600,
        maxHeight: '100vh',
        panelClass: ['m-3', 'animate__animated', 'animate__fadeInDown'],
        disableClose: true,
        data: {question: this.data[this.index].question, options: this.data[this.index].options}
      }).afterClosed().subscribe(d => {
        this.scene1.nativeElement.classList.remove('animate__fadeOutDown');
        if (this.data[this.index].answer == d) {
          this.star.nativeElement.children[this.noOfItems - 1 - this.index].style.visibility = 'visible';
        }
        this.index++;
        this.scene1.nativeElement.play();
        this.dialog = 0;
      });
    }
  }

  next() {
    this.router.navigate(['/lectures/scene2']);
  }

  back() {
    this.router.navigate(['/lectures/explainer']);
  }
}
