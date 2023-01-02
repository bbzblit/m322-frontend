import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { share } from 'rxjs';
import { AppUser } from '../model/appuser.model';
import { Folder } from '../model/folder.model';
import { AppuserService } from '../service/appuser.service';
import { loadAppUser } from '../state/appUser.action';
import { selectAppUser } from '../state/appUser.selector';
import { authReducer } from '../state/auth.reducer';
import { selectAuthUser } from '../state/auth.selector';
import { addError } from '../state/error.action';
import { updateFolder } from '../state/folder.action';

@Component({
  selector: 'app-share-popup',
  templateUrl: './share-popup.component.html',
  styleUrls: ['./share-popup.component.scss']
})
export class SharePopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SharePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store : Store) { }

  me? : AppUser  = undefined;

  ngOnInit(): void {
    this.store.select(selectAuthUser).subscribe(me => this.me = me);
  }

  addToFolder(appUser : AppUser, mode : string){
    if(appUser.id == this.me?.id){
      this.store.dispatch(addError({message : "You can't give yourself access"}));
      return;
    }
    let folder = this.data.folder as Folder;
    if(folder.viewAccess?.indexOf(appUser.id) == -1 || folder.writeAccess?.indexOf(appUser.id) == -1){
      this.store.dispatch(addError({message : "This user does already have read or write access"}));
      return;
    }

    if(mode === "read"){
      if(!folder.viewAccess){
        folder.viewAccess = [];
      }
      folder.viewAccess = [... folder.viewAccess];
      folder.viewAccess.push(appUser.id);
    } else{
      if(!folder.writeAccess){
        folder.writeAccess = [];
      }
      folder.writeAccess = [... folder.writeAccess];
      folder.writeAccess.push(appUser.id);
    }

    this.store.dispatch(updateFolder(folder));
    

    console.log(appUser);
  }

  shareForm = new FormGroup({
    userNameOrEmail: new FormControl("", [Validators.required]),
    readWrite: new FormControl("", [Validators.required]),
  });

  initAccessFlow(){
    let form = this.shareForm.getRawValue();
    this.store.select(selectAppUser).subscribe(appUsers => appUsers.forEach(appUser => {if(appUser.email == form.userNameOrEmail || appUser.userName == form.userNameOrEmail )this.addToFolder(appUser, form.readWrite!)}));
    this.store.dispatch(loadAppUser({emailOrUsername : form.userNameOrEmail!}));
  }
}
