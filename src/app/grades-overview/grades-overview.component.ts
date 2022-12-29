import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Folder } from '../model/folder.model';
import { Grade } from '../model/grade.model';
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
  public folder: Folder = { title: "", subjects: [] };
  public displayedColumns: Array<string> = ['name', 'grades', 'actions'];
  public openEvent: Subject<void> = new Subject<void>();
  public selectedSubject: number = -1;
  public menuPosition = { x: 0, y: 0 };

  constructor(private route: ActivatedRoute, private store: Store, public dialog: MatDialog) { }

  loader(folder: Array<Folder>) {
    if (folder.length === 0 && !this.loaded) {
      this.store.dispatch(loadFolders());
    }
  }

  ngOnInit(): void {
    this.store.select(selectFolder).subscribe(folder => this.loader(folder))
    this.folderId = this.route.snapshot.paramMap.get('id')!;
    this.store.select(selectFolderById({ folderId: this.folderId })).subscribe(folder => { let _folder = { ...folder }; if (!_folder?.subjects) { _folder.subjects = [] }; this.folder = _folder; })
  }

  openMenu(_event: any, index: number) {
    let event: PointerEvent = _event as PointerEvent;
    event.preventDefault();
    this.selectedSubject = index;
    this.menuPosition.x = event.clientX;
    this.menuPosition.y = event.clientY;
    this.openEvent.next();
  }

  createSubject(subject: SubjectModel) {
    if (!subject) { return; }
    if (!this.folder.subjects) {
      this.folder.subjects = [];
    }
    this.folder.subjects = [...this.folder.subjects, subject];

    console.log(this.folder)
    this.store.dispatch(updateFolder(this.folder));
  }

  deleteSubject(index: number) {
    if (!this.folder.subjects) {
      this.folder.subjects = [];
    }

    this.folder.subjects = [...this.folder.subjects];
    this.folder.subjects.splice(index, 1);

    this.store.dispatch(updateFolder(this.folder));
  }

  updateSubject(subject: SubjectModel, index: number) {
    if (!this.folder.subjects) {
      return;
    }

    this.folder.subjects = [...this.folder.subjects];
    this.folder.subjects[index] = subject;

    this.store.dispatch(updateFolder(this.folder));
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(GradesPopupHelperComponent, {
      width: '24rem',
      height: '17rem',
      data: { type: 'create' },
    });
    dialogRef.afterClosed().subscribe(_result => this.createSubject(_result as SubjectModel));

  }
  openDeleteDialog() {
    const dialogRef = this.dialog.open(GradesPopupHelperComponent, {
      width: '24rem',
      height: '12rem',
      data: { type: 'delete', subject: this.folder.subjects?.at(this.selectedSubject) }
    })

    dialogRef.afterClosed().subscribe(_result => { if (_result) { this.deleteSubject(this.selectedSubject) } });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(GradesPopupHelperComponent, {
      width: '24rem',
      height: '17rem',
      data: { type: 'edit', subject: { ...this.folder.subjects?.at(this.selectedSubject) } }
    })

    dialogRef.afterClosed().subscribe(_result => this.updateSubject(_result, this.selectedSubject));
  }

  createGrade(grade: Grade) {
    //TODO: Implement when actions exist
  }

  openAddGradeDialog() {
    const dialogRef = this.dialog.open(GradesPopupHelperComponent, {
      width: '24ren',
      height: '20rem',
      data: { type: 'addGrade' }
    })
    dialogRef.afterClosed().subscribe(_result => this.createGrade(_result))
  }

}
