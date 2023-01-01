import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Folder } from '../model/folder.model';
import { Grade } from '../model/grade.model';
import { SubjectModel } from '../model/subject.model';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http : HttpClient) { }

  createGrade(grade : Grade, folderId : String, subjectId : string) : Observable<SubjectModel>{
    return this.http.post("/api/grade?folderId=" + folderId + "&subjectId=" + subjectId, grade);
  }

}
