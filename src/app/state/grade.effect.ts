import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, Subject, switchMap } from "rxjs";
import { AppUser } from "../model/appuser.model";
import { Exception } from "../model/exception.model";
import { Folder } from "../model/folder.model";
import { Grade } from "../model/grade.model";
import { LoginModel } from "../model/login.model";
import { SubjectModel } from "../model/subject.model";
import { AppuserService } from "../service/appuser.service";
import { GradeService } from "../service/grade.service";
import { login, loginSuccess, logout, logoutSuccess, register, registerSuccess, tryReLogin } from "./appuser.action";
import { addError } from "./error.action";
import { addGrade, addGradeSuccess } from "./grade.action";

@Injectable()
export class GradeEffect {
  constructor(private actions$: Actions, private gradeService: GradeService) { }

  addGrade$ = createEffect(() => this.actions$.pipe(
    ofType(addGrade),
    switchMap(({grade, folderId, subjectId}) =>
      this.gradeService.createGrade(grade, folderId, subjectId).pipe(
        map((subject: SubjectModel) => addGradeSuccess(subject)),
        catchError(error => of(addError(error.error as Exception)))
      )
    )
  ))
}