import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Grade } from 'src/app/model/grade.model';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {

  @Input("readOnlyAccess") readOnlyAccess : boolean = false;
  @Input("grades") grades! : Array<Grade>;
  @Output("deleteGrade") deleteGrade : EventEmitter<Grade> = new EventEmitter<Grade>();
  @Output("createNewGrade") createNewGrade : EventEmitter<void> = new EventEmitter<void>();
  @Output("viewGrade") viewGrade : EventEmitter<Grade> = new EventEmitter<Grade>();

  constructor() { }

  ngOnInit(): void {
  }

}
