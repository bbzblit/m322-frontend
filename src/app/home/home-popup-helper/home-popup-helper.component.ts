import { Component, Inject, Input, OnInit } from '@angular/core';
import {MatDialog , MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-home-popup-helper',
  templateUrl: './home-popup-helper.component.html',
  styleUrls: ['./home-popup-helper.component.scss']
})
export class HomePopupHelperComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HomePopupHelperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
