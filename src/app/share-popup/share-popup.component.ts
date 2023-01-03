import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { identity, Observable, Observer, share, Subscription } from 'rxjs';
import { AppUser } from '../model/appuser.model';
import { Folder } from '../model/folder.model';
import { AppuserService } from '../service/appuser.service';
import { loadAppUsByUserId, loadAppUser } from '../state/appUser.action';
import { selectAppUser } from '../state/appUser.selector';
import { authReducer } from '../state/auth.reducer';
import { selectAuthUser } from '../state/auth.selector';
import { addError } from '../state/error.action';
import { updateFolder } from '../state/folder.action';
import { selectFolderById } from '../state/folder.selector';

@Component({
  selector: 'app-share-popup',
  templateUrl: './share-popup.component.html',
  styleUrls: ['./share-popup.component.scss']
})
export class SharePopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SharePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store, private _snackBar: MatSnackBar) { }

  me?: AppUser = undefined;
  onlyViewAccess = false;
  displayedColumns: Array<string> = ['username', 'email', 'accessType', 'actions']

  owner: AppUser = this.data.folder.owner as AppUser;
  haveAccess: Array<string> = [];

  updateAccessTypes() {
    this.haveAccess = [];
    this.haveAccess.push(this.data.folder.owner.id);
    this.data.folder.viewAccess.forEach((uid: string) => this.haveAccess.push(uid));
    this.data.folder.writeAccess.forEach((uid: string) => this.haveAccess.push(uid));
  }

  ngOnInit(): void {
    this.store.select(selectAuthUser).subscribe(me => this.me = me);
    this.store.select(selectFolderById({ folderId: this.data.folder.id })).subscribe(folder => { this.data.folder = { ...folder }; this.updateAccessTypes() });
    
    this.onlyViewAccess = this.owner.id != this.me?.id
    if(this.onlyViewAccess){
      this.shareForm.controls.userNameOrEmail.disable();
      this.shareForm.controls.readWrite.disable();
    }
  }

  addToFolder(appUser: AppUser, mode: string) {

    if (appUser.id == this.me?.id) {
      this.store.dispatch(addError({ message: "You can't give yourself access" }));
      return;
    }

    let folder = this.data.folder as Folder;

    if (!folder.viewAccess) {
      folder.viewAccess = [];
    }
    if (!folder.writeAccess) {
      folder.writeAccess = [];
    }

    if (folder.viewAccess?.indexOf(appUser.id) != -1 || folder.writeAccess?.indexOf(appUser.id) != -1) {
      this.store.dispatch(addError({ message: "This user does already have read or write access" }));
      return;
    }
    if (mode === "read") {
      folder.viewAccess = [...folder.viewAccess!];
      folder.viewAccess!.push(appUser.id);
    } else {
      folder.writeAccess = [...folder.writeAccess!];
      folder.writeAccess!.push(appUser.id);
    }

    this.store.dispatch(updateFolder(folder));


  }

  shareForm = new FormGroup({
    userNameOrEmail: new FormControl("", []),
    readWrite: new FormControl("", [Validators.required]),
  });


  lazyLoad(appUsers: Array<AppUser>, userNameOrEmail : string) {
    let alreadyLoadet = false; appUsers.forEach(appUser => { if (appUser.email == userNameOrEmail || appUser.userName == userNameOrEmail) alreadyLoadet = true; });
    if (!alreadyLoadet)
      this.store.dispatch(loadAppUser({ emailOrUsername: userNameOrEmail }));
  }

  initAccessFlow() {
    let form = this.shareForm.getRawValue();
    this.store.select(selectAppUser).subscribe(appUsers => { this.lazyLoad(appUsers, form.userNameOrEmail!); appUsers.forEach(appUser => { if (appUser.email == form.userNameOrEmail || appUser.userName == form.userNameOrEmail) this.addToFolder(appUser, form.readWrite!); this.shareForm.reset(); }) });

  }

  removeAccess(uid: string) {
    let origignalFolder = Object.assign({},this.data.folder);
    this.data.folder.writeAccess = this.data.folder.writeAccess.filter((elm: string) => elm !== uid);
    this.data.folder.viewAccess = this.data.folder.viewAccess.filter((elm: string) => elm !== uid);
    this.store.dispatch(updateFolder(this.data.folder));
    let dialogRef = this._snackBar.open("Successful removed access from user", "Undo",{duration : 5000});
    dialogRef.onAction().subscribe(() => this.store.dispatch(updateFolder(origignalFolder)));
  }
}
