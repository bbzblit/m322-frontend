import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { AppUser } from "../model/appuser.model";
import { Exception } from "../model/exception.model";
import { LoginModel } from "../model/login.model";
import { AppuserService } from "../service/appuser.service";
import { login, loginSuccess, logout, logoutSuccess, register, registerSuccess, tryReLogin } from "./auth.action";
import { addError } from "./error.action";

@Injectable()
export class AuthEffect {
  constructor(private actions$: Actions, private appUserService: AppuserService) { }

  singUp$ = createEffect(() => this.actions$.pipe(
    ofType(register),
    switchMap((data: AppUser) =>
      this.appUserService.register(data).pipe(
        map((registertUser: AppUser) => registerSuccess(registertUser)),
        catchError(error => of(addError(error.error as Exception)))
      )
    )
  ))

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap((data: LoginModel) =>
      this.appUserService.login(data).pipe(
        map((registertUser: AppUser) => loginSuccess(registertUser)),
        catchError(error => of(addError(error.error as Exception)))
      )
    )
  ))
  relogin$ = createEffect(() => this.actions$.pipe(
    ofType(tryReLogin),
    switchMap(() =>
      this.appUserService.tryReLogin().pipe(
        map((registertUser: AppUser) => loginSuccess(registertUser)),
        catchError(error => of(addError(error.error as Exception)))
      )
    )
  ))
  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    switchMap(() =>
      this.appUserService.logout().pipe(
        map(() => logoutSuccess()),
        catchError(error => of(addError(error.error as Exception)))
      )
    )
  ))
}