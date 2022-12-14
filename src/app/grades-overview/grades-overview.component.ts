import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Folder } from '../model/folder.model';
import { SubjectModel } from '../model/subject.model';
import { loadFolders, updateFolder } from '../state/folder.action';
import { selectFolder, selectFolderById } from '../state/folder.selector';
import { GradesPopupHelperComponent } from './grades-popup-helper/grades-popup-helper.component';

@Component({
  selector: 'app-grades-overview',
  templateUrl: './grades-overview.component.html',
  styleUrls: ['./grades-overview.component.scss']
})
export class GradesOverviewComponent implements OnInit {

  private loaded: boolean = false;

  public folderId: string = "";
  public folder: Folder = { title : "", subjects: [] };
  public displayedColumns: Array<string> = ['name'];
  public openEvent: Subject<void> = new Subject<void>();

  public menuPosition = {x : 0, y : 0};

  constructor(private route: ActivatedRoute, private store: Store, public dialog: MatDialog) { }

  loader(folder: Array<Folder>) {
    if (folder.length === 0 && !this.loaded) {
      this.store.dispatch(loadFolders());
    }
  }

  ngOnInit(): void {
    this.store.select(selectFolder).subscribe(folder => this.loader(folder))
    this.folderId = this.route.snapshot.paramMap.get('id')!;
    this.store.select(selectFolderById({ folderId: this.folderId })).subscribe(folder => { let _folder = {...folder}; if (!_folder?.subjects) { _folder.subjects = [] }; this.folder = _folder; })
  }

  openMenu(_event : any, index : number){
    let event : PointerEvent = _event as PointerEvent;
    event.preventDefault();
    this.menuPosition.x = event.clientX;
    this.menuPosition.y = event.clientY;
    this.openEvent.next();
  }

  createSubject(subject : SubjectModel){
    if(!subject){return;}
    if(!this.folder.subjects){
      this.folder.subjects = [];
    }
    this.folder.subjects = [...this.folder.subjects, subject];

    console.log(this.folder)
    this.store.dispatch(updateFolder(this.folder));
  }

  openCreateDialog(){
    const dialogRef = this.dialog.open(GradesPopupHelperComponent, {
      width: '24rem',
      height: '17rem',
      data: {type: 'create'},
    });
    dialogRef.afterClosed().subscribe(_result => this.createSubject(_result as SubjectModel));

  }

}
