import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppUser } from '../model/appuser.model';
import { Folder } from '../model/folder.model';
import { AppuserService } from '../service/appuser.service';
import { register, tryReLogin } from '../state/auth.action';
import { selectAuthUser } from '../state/auth.selector';
import { createFolder, deletFolder, loadFolders, updateFolder } from '../state/folder.action';
import { selectFolder } from '../state/folder.selector';
import { HomePopupHelperComponent } from './home-popup-helper/home-popup-helper.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public me!: AppUser;
  public folder!: Array<Folder>;
  public displayedColumns: string[] = ['title', 'owner', 'viewAccess', 'writeAccess', 'actions'];
  public selectedRow: number = -1;
  public menuPosition = { x: 0, y: 0 };
  public eventsSubject: Subject<void> = new Subject<void>();

  constructor(private store: Store, public dialog: MatDialog) { }



  ngOnInit(): void {
    this.store.dispatch(loadFolders());
    this.store.select(selectAuthUser).subscribe(me => this.me = me);
    this.store.select(selectFolder).subscribe(folders => this.folder = folders);
  }

  openContextMenu(_event: any, index: number) {
    let event = _event as PointerEvent;
    event.preventDefault();
    this.selectedRow = index;
    this.eventsSubject.next();
    this.menuPosition.x = event.clientX;
    this.menuPosition.y = event.clientY;
  }

  deleteRow(confirm: boolean, index: number) {
    if (confirm) {
      this.store.dispatch(deletFolder({ folderId: this.folder[index].id! }))
    }
  }

  openDeleteDialog(index: number) {
    const dialogRef = this.dialog.open(HomePopupHelperComponent, {
      width: '30rem',
      height: '12rem',
      data: { type: 'delete', foldername: this.folder[this.selectedRow].title },
    });

    dialogRef.afterClosed().subscribe(_result => this.deleteRow(_result, index));
  }

  createFolder(folder: Folder) {
    if (!folder) { return; }
    this.store.dispatch(createFolder(folder));
  }
  
  openCreateDialog() {
    const dialogRef = this.dialog.open(HomePopupHelperComponent, {
      width: '24rem',
      height: '17rem',
      data: { type: 'create' },
    });

    dialogRef.afterClosed().subscribe(_result => this.createFolder(_result as Folder))

    console.log("Creating new folder");
  }

  editFolder(folder: Folder) {
    if (!folder) { return; }
    this.store.dispatch(updateFolder(folder));
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(HomePopupHelperComponent, {
      width: '24rem',
      height: '17rem',
      data: { type: 'edit', oldfolder: this.folder[this.selectedRow] },
    });
    dialogRef.afterClosed().subscribe(_result => this.editFolder(_result as Folder))
  }

  loadSubjects(index: number) {
    let _folder = this.folder[index]
    window.location.replace("./edit/" + _folder.id);
  }
}
