import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppUser } from 'src/app/model/appuser.model';
import { LoginModel } from 'src/app/model/login.model';
import { login } from 'src/app/state/auth.action';
import { selectAuthUser } from 'src/app/state/auth.selector';

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

  constructor(private store: Store) { }

  private getCookie(name: string) {
    var cookieArr = document.cookie.split(";");
    for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      if (name == cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }
  ngOnInit(): void {
    this.store.select(selectAuthUser).subscribe(appUser => {
      if (Object.keys(appUser).length !== 0) { window.location.replace("./home"); }
    });
  }

  login() {
    let _data = this.loginForm.getRawValue() as LoginModel;
    this.store.dispatch(login(_data));
  }

}
