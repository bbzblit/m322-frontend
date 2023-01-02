import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, mergeMap } from "rxjs";
import { AppUser } from "../model/appuser.model";
import { Exception } from "../model/exception.model";
import { LoginModel } from "../model/login.model";
import { AppuserService } from "../service/appuser.service";
import { loadAppUsByUserId, loadAppUser, loadAppUserSuccess } from "./appUser.action";
import { login, loginSuccess, logout, logoutSuccess, register, registerSuccess, tryReLogin } from "./auth.action";
import { addError } from "./error.action";

@Injectable()
export class AppUserEffect {
  constructor(private actions$: Actions, private appUserService: AppuserService) { }

  getAppUser$ = createEffect(() => this.actions$.pipe(
    ofType(loadAppUser),
    mergeMap(({emailOrUsername}) =>
      this.appUserService.getAppUser(emailOrUsername).pipe(
        map((appUser: AppUser) => loadAppUserSuccess(appUser)),
        catchError(error => of(addError(error.error as Exception)))
      )
    )
  ))

  getAppUserById$ = createEffect(() => this.actions$.pipe(
    ofType(loadAppUsByUserId),
    mergeMap(({userid}) =>
      this.appUserService.getAppUserById(userid).pipe(
        map((appUser: AppUser) => loadAppUserSuccess(appUser)),
        catchError(error => of(addError(error.error as Exception)))
      )
    )
  ))


}