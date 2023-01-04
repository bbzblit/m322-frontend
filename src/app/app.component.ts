import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Message } from './model/exception.model';
import { loadAppUsByUserId, loadAppUser } from './state/appUser.action';
import { selectAppUserById } from './state/appUser.selector';
import { deleteFirstError } from './state/message.action';
import { selectFolder } from './state/folder.selector';
import { selectMessage } from './state/message.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rgb: boolean = localStorage.getItem("rgb") === "true";
  title = 'grades-application-m120';

  requestedUser: Array<string> = []

  legacyLoad(uid : string){
    if(this.requestedUser.indexOf(uid) != -1){
      return;
    }
    this.requestedUser.push(uid);
    this.store.select(selectAppUserById({appUserId : uid})).subscribe(appuser => {if(appuser === undefined) this.store.dispatch(loadAppUsByUserId({userid : uid}))})
  }

  constructor(private _snackBar: MatSnackBar, private store: Store, private router : Router) {
    this.store.select(selectMessage).subscribe(errors => { if (errors && errors.length > 0) { this.openSnackBar(errors.at(0)) } })
    this.store.select(selectFolder).subscribe(folders => folders.forEach(folder => {folder.viewAccess?.forEach(uid => this.legacyLoad(uid)); folder.writeAccess?.forEach(uid => this.legacyLoad(uid))}))
  }

  openSnackBar(exception: Message | undefined) {
    if (!exception) {
      return;
    }
    if(exception.status === 401){
      this.router.navigate(["/login"]);
    }
    let _snackBarRef = this._snackBar.open(exception.message!, "Got it");
    _snackBarRef.onAction().subscribe(() => this.store.dispatch(deleteFirstError()))
  }

  get url(): string{
    if(this.router.url === "/login" || this.router.url === "/sing-up"){
      return "/login";
    }
    return "/home";
  }

  toggleRGB(){
    this.rgb = !this.rgb;
    localStorage.setItem("rgb", ""+this.rgb);
  }

}
