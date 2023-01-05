import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppUser } from 'src/app/model/appuser.model';
import { LoginModel } from 'src/app/model/login.model';
import { login } from 'src/app/state/auth.action';
import { selectAuthUser } from 'src/app/state/auth.selector';
import { PasswordResetComponent } from '../password-reset/password-reset.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userNameOrEmail: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  passwordHide: boolean = true;

  constructor(private store: Store, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.store.select(selectAuthUser).subscribe(appUser => {
      if (Object.keys(appUser).length !== 0) { window.location.replace("./home"); }
    });
  }

  login() {
    let _data = this.loginForm.getRawValue() as LoginModel;
    this.store.dispatch(login(_data));
  }

  openPasswordResetDialog(){
    const dialogRef = this.dialog.open(
      PasswordResetComponent, {
        width: '35rem',
        height: '20rem',
      }
    );

  }
}
