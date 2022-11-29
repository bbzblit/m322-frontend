import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppUser } from 'src/app/model/appuser.model';
import { LoginModel } from 'src/app/model/login.model';
import { clearAppUserCach, login, tryReLogin } from 'src/app/state/appuser.action';
import { selectAppUser } from 'src/app/state/appuser.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userNameOrEmail: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
  });

  passwordHide : boolean = true;

  constructor(private store : Store) { }

  ngOnInit(): void {
    this.store.dispatch(clearAppUserCach());
    this.store.dispatch(tryReLogin());
    this.store.select(selectAppUser).subscribe(appUser => {
      if(Object.keys(appUser).length !== 0){window.location.replace("./home");}
   });  
  }

  login(){
    let _data = this.loginForm.getRawValue() as LoginModel;
    this.store.dispatch(login(_data));
  }

}
