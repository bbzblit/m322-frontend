import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Folder } from '../model/folder.model';
import { selectAppUserById } from '../state/appUser.selector';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private http : HttpClient, private store : Store) { }

  loadAllFolder(){
    let _result$ = this.http.get<Array<Folder>>("/api/folder");
    return _result$
  }

  deleteFolder(folderId : string){
    return this.http.delete<void>("/api/folder/?id=" + folderId);
  }

  createFolder(folder : Folder) : Observable<Folder>{
    return this.http.post<Folder>("/api/folder", folder);

  }

  updateFolder(folder : Folder) : Observable<Folder>{
    return this.http.put<Folder>("/api/folder", folder);
  }

}
