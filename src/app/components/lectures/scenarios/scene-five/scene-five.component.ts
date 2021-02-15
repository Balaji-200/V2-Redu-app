import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {QuestionDialogComponent} from '../../question-dialog/question-dialog.component';
import {ConfirmDialogComponent} from '../../confirm-dialog/confirm-dialog.component';
import {PosttestService} from '../../../../services/posttest/posttest.service';

@Component({
  selector: 'app-scene-five',
  templateUrl: './scene-five.component.html',
  styleUrls: ['./scene-five.component.css']
})
export class SceneFiveComponent implements OnInit, AfterViewInit {

  @ViewChild('scene5') scene5: ElementRef<HTMLVideoElement>;
  @ViewChild('star') star: ElementRef;

  time = [22, 32, 46];
  data = [
    {
      question: 'What symptoms do you see?',
      options: [
        'Dysrhythmia, Absence of pulse, PEA, Gasping',
        'Apnea, Syncope, Cyanosis, Acrocyanosis',
        'Absence of pulse, Apnea, Cyanosis, Unconscious',
        'Gasping, Syncope, Acrocyanosis, Stupor'
      ],
      answer: 'Absence of pulse, Apnea, Cyanosis, Unconscious'
    },
    {
      question: 'What will you do first?',
      options: [
        'Check for capillary refill.',
        'Open the airway.',
        'Check for pneumothorax.',
        'Attempt CPR.'
      ],
      answer: 'Open the airway.'
    },
    {
      question: 'What will you tag the victim?',
      options: [
        'Green',
        'Yellow',
        'Red',
        'Black'
      ],
      answer: 'Black'
    }
  ];
  dialog = 0;
  index = 0;
  processing = false;
  noOfItems = 0;

  constructor(private router: Router, private questionDialog: MatDialog, private postTestService: PosttestService) {
  }

  ngAfterViewInit() {
    this.noOfItems = this.star.nativeElement.children.length;
    for (let i = 0; i < this.noOfItems; i++) {
      this.star.nativeElement.children[i].style.visibility = 'hidden';
    }
    this.scene5.nativeElement.addEventListener('timeupdate', () => {
      let curTime = this.scene5.nativeElement.currentTime;
      if (curTime >= this.time[this.index] && this.index != this.time.length) {
        this.scene5.nativeElement.pause();
        this.dialog++;
        this.invoke();
      }
    });
    this.scene5.nativeElement.onended = () => {
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
      this.scene5.nativeElement.classList.add('animate__fadeOutDown');
      this.dialog = 0;
      this.questionDialog.open(QuestionDialogComponent, {
        maxWidth: 600,
        maxHeight: '100vh',
        panelClass: ['m-3', 'animate__animated', 'animate__fadeInDown'],
        disableClose: true,
        data: {question: this.data[this.index].question, options: this.data[this.index].options}
      }).afterClosed().subscribe(d => {
        this.scene5.nativeElement.classList.remove('animate__fadeOutDown');
        if (this.data[this.index].answer == d) {
          this.star.nativeElement.children[this.noOfItems - 1 - this.index].style.visibility = 'visible';
        }
        this.index++;
        this.scene5.nativeElement.play();
        this.dialog = 0;
      });
    }
  }

  next() {
    this.questionDialog.open(ConfirmDialogComponent, {
      maxWidth: 600,
      panelClass: ['m-3'],
    }).afterClosed().subscribe(d => {
      if (d == 'Proceed') {
        this.processing = true;
        this.postTestService.setPostTestDate().subscribe(res => {
          if (res.testDate != null || res.testDate != '') {
            localStorage.setItem('testDate', res.testDate);
            localStorage.setItem('lect', 'true');
            this.router.navigate(['/dashboard/posttest']);
            this.processing = false;
          }
        }, error => this.router.navigate(['/']));
      }
    });
  }

  back() {
    this.router.navigate(['/lectures/scene4']);
  }

}
