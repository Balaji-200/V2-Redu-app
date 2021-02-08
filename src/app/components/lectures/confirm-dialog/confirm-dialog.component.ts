import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public confirmDialog: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit(): void {
  }

  proceedForTest(){
    this.confirmDialog.close('Proceed')
  }

  cancel(){
    this.confirmDialog.close()
  }
}
