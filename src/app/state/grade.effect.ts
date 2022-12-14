import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, Subject, mergeMap } from "rxjs";
import { AppUser } from "../model/appuser.model";
import { Message } from "../model/exception.model";
import { Folder } from "../model/folder.model";
import { Grade } from "../model/grade.model";
import { LoginModel } from "../model/login.model";
import { SubjectModel } from "../model/subject.model";
import { AppuserService } from "../service/appuser.service";
import { GradeService } from "../service/grade.service";
import { addError } from "./message.action";
import { addGrade, addGradeSuccess, deleteGrade, deleteGradeSuccess } from "./grade.action";

@Injectable()
export class GradeEffect {
  constructor(private actions$: Actions, private gradeService: GradeService) { }

  addGrade$ = createEffect(() => this.actions$.pipe(
    ofType(addGrade),
    mergeMap(({grade, folderId, subjectId}) =>
      this.gradeService.createGrade(grade, folderId, subjectId).pipe(
        map((subject: SubjectModel) => addGradeSuccess(subject)),
        catchError(error => of(addError(error.error as Message)))
      )
    )
  ))

  deleteGrade$ = createEffect(() => this.actions$.pipe(
    ofType(deleteGrade),
    mergeMap(({gradeId, folderId, subjectId}) =>
      this.gradeService.deleteGrade(gradeId, folderId, subjectId).pipe(
        map((subject: SubjectModel) => deleteGradeSuccess(subject)),
        catchError(error => of(addError(error.error as Message)))
      )
    )
  ))
}