import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Exception } from './model/exception.model';
import { deleteFirstError } from './state/error.action';
import { selectError } from './state/error.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rgb: boolean = false;
  title = 'grades-application-m120';


  constructor(private _snackBar: MatSnackBar, private store: Store, private router : Router) {
    this.store.select(selectError).subscribe(errors => { if (errors && errors.length > 0) { this.openSnackBar(errors.at(0)) } })
  }

  openSnackBar(exception: Exception | undefined) {
    if (!exception) {
      return;
    }
    if(exception.status === 401){
      this.router.navigate(["/login"]);
    }
    let _snackBarRef = this._snackBar.open(exception.message, "Got it");
    _snackBarRef.onAction().subscribe(() => this.store.dispatch(deleteFirstError()))
  }

}
