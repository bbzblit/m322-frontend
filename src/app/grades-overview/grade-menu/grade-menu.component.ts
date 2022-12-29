import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grade-menu',
  templateUrl: './grade-menu.component.html',
  styleUrls: ['./grade-menu.component.scss']
})
export class GradesMenuComponent implements OnInit {

  @Input("selectedFolder") selectedFolder : boolean = false;
  @Input("open") open!: Observable<void>;
  
  @Output("close") closeEvent: EventEmitter<void> = new EventEmitter<void>();

  @Output("create") create : EventEmitter<void> = new EventEmitter<void>();
  @Output("delete") deleteFolder : EventEmitter<void> = new EventEmitter<void>();
  @Output("edit") edit : EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;



  constructor() { }

  ngOnInit(): void {
    this.open.subscribe(_ =>  this.menuTrigger.openMenu());
  }

}
