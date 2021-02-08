import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent implements OnInit {

  constructor(private router: Router, private successDialogRef: MatDialogRef<SuccessDialogComponent>) { }

  ngOnInit(): void {
  }

  login(){
    this.successDialogRef.close();
    this.router.navigate(['login'])
  }
}
