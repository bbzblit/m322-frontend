import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppUser } from '../model/appuser.model';
import { Folder } from '../model/folder.model';
import { AppuserService } from '../service/appuser.service';
import { register, tryReLogin } from '../state/appuser.action';
import { selectAppUser } from '../state/appuser.selector';
import { loadFolders } from '../state/folder.action';
import { selectFolder } from '../state/folder.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public me! : AppUser;
  public folder! : Array<Folder>;
  public displayedColumns: string[] = ['title', 'owner', 'viewAccess', 'writeAccess'];
  public selectedRow : number = -1;
  public menuPosition =  {x: 0, y: 0}; 
  public eventsSubject: Subject<void> = new Subject<void>();
  
  constructor(private store : Store) { }



  ngOnInit(): void {
    this.store.dispatch(tryReLogin());
    this.store.dispatch(loadFolders());
    this.store.select(selectAppUser).subscribe(me => this.me = me);
    this.store.select(selectFolder).subscribe(folders => this.folder = folders);
  }


  select(row : number){

  }

  openContextMenu(_event : any, index : number){
    let event = _event as PointerEvent;
    event.preventDefault();
    this.selectedRow = index;
    this.eventsSubject.next();
    this.menuPosition.x = event.clientX;
    this.menuPosition.y = event.clientY;
  }
}
