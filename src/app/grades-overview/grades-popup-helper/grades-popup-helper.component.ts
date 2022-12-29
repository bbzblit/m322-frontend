import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomePopupHelperComponent } from 'src/app/home/home-popup-helper/home-popup-helper.component';

@Component({
  selector: 'app-grades-popup-helper',
  templateUrl: './grades-popup-helper.component.html',
  styleUrls: ['./grades-popup-helper.component.scss']
})
export class GradesPopupHelperComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HomePopupHelperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  name : string = "";
  ngOnInit(): void {
    if(this.data.type === 'create'){
      this.data.subject = {name : ""}
    }
    if(this.data.type === 'edit'){
      this.name = this.data.subject.name;
    }

  }

}
