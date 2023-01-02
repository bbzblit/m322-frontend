import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, mergeMap } from "rxjs";
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
    mergeMap((data: AppUser) =>
      this.appUserService.register(data).pipe(
        map((registertUser: AppUser) => registerSuccess(registertUser)),
        catchError(error => of(addError(error.error as Exception)))
      )
    )
  ))

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    mergeMap((data: LoginModel) =>
      this.appUserService.login(data).pipe(
        map((registertUser: AppUser) => loginSuccess(registertUser)),
        catchError(error => of(addError(error.error as Exception)))
      )
    )
  ))
  relogin$ = createEffect(() => this.actions$.pipe(
    ofType(tryReLogin),
    mergeMap(() =>
      this.appUserService.tryReLogin().pipe(
        map((registertUser: AppUser) => loginSuccess(registertUser)),
        catchError(error => of(addError(error.error as Exception)))
      )
    )
  ))
  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    mergeMap(() =>
      this.appUserService.logout().pipe(
        map(() => logoutSuccess()),
        catchError(error => of(addError(error.error as Exception)))
      )
    )
  ))
}