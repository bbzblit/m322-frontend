import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
  public displayedColumns: string[] = ['title', 'owner'];

  constructor(private store : Store) { }

  ngOnInit(): void {
    this.store.dispatch(tryReLogin());
    this.store.dispatch(loadFolders());
    this.store.select(selectAppUser).subscribe(me => this.me = me);
    this.store.select(selectFolder).subscribe(folders => this.folder = folders);
  }

}
