import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs";
import { AppUser } from "../model/appuser.model";
import { LoginModel } from "../model/login.model";
import { AppuserService } from "../service/appuser.service";
import { login, loginSuccess, register, registerSuccess, tryReLogin } from "./appuser.action";

@Injectable()
export class AppUserEffect {
  constructor(private actions$: Actions, private appUserService: AppuserService) {}

  singUp$ = createEffect( () => this.actions$.pipe(
    ofType(register),
    switchMap((data : AppUser) =>
      this.appUserService.register(data).pipe(
        map((registertUser: AppUser) => registerSuccess(registertUser)),
        //catchError(error => console.log(error))) //TODO: Replace with exeption handeling
      )
    )
  ))
  
  login$ = createEffect( () => this.actions$.pipe(
    ofType(login),
    switchMap((data : LoginModel) =>
      this.appUserService.login(data).pipe(
        map((registertUser: AppUser) => loginSuccess(registertUser)),
        //catchError(error => console.log(error))) //TODO: Replace with exeption handeling
      )
    )
  ))
  relogin$ = createEffect( () => this.actions$.pipe(
    ofType(tryReLogin),
    switchMap(() =>
      this.appUserService.tryReLogin().pipe(
        map((registertUser: AppUser) => loginSuccess(registertUser)),
        //catchError(error => console.log(error))) //TODO: Replace with exeption handeling
      )
    )
  ))
}