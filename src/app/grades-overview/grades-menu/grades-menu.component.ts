import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grades-menu',
  templateUrl: './grades-menu.component.html',
  styleUrls: ['./grades-menu.component.scss']
})
export class GradesMenuComponent implements OnInit {

  @Input("open") open!: Observable<void>;
  @Output("close") closeEvent: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  @Output("createSubject") createSubject : EventEmitter<void> = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
    this.open.subscribe(_ =>  this.menuTrigger.openMenu());
  }

}
