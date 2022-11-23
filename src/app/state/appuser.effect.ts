import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs";
import { AppUser } from "../model/appuser.model";
import { AppuserService } from "../service/appuser.service";
import { register, registerSuccess } from "./appuser.action";

@Injectable()
export class AppUserEffect {
  constructor(private actions$: Actions, private appUserService: AppuserService) {}

  getAttendees$ = createEffect( () => this.actions$.pipe(
    ofType(register),
    switchMap((data : AppUser) =>
      this.appUserService.register(data).pipe(
        map((registertUser: AppUser) => registerSuccess(registertUser)),
        //catchError(error => console.log(error))) //TODO: Replace with exeption handeling
      )
    )
  ))
}