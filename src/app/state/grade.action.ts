import { createAction, props } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Grade } from '../model/grade.model';
import { SubjectModel } from '../model/subject.model';

export const addGrade = createAction(
  '[API] adding grade',
  props<{grade : Grade, folderId : string, subjectId : string}>()
);

export const addGradeSuccess = createAction(
  '[Collecton] add grade succes',
  props<SubjectModel>()
);