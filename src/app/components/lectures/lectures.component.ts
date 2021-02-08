import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PosttestService} from '../../services/posttest/posttest.service';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.css']
})
export class LecturesComponent implements OnInit {

  processing = false;

  constructor(private router: Router, private postTestService: PosttestService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if(localStorage.getItem('lect') == null || localStorage.getItem('lect')==''){
    this.processing = true
    this.postTestService.getPostTest().subscribe(res => {
      if(res.questions.length > 0) {
        localStorage.setItem('lect', 'true');
        this.router.navigate(['dashboard/posttest']);
      }
      else
        localStorage.setItem('lect', 'false');
      this.processing= false;
    })}
  }

  next() {
    this.dialog.open(ConfirmDialogComponent, {
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
        }, error => this.router.navigate(['login']));
      }
    });
  }
}
