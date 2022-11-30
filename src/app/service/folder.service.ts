import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Folder } from '../model/folder.model';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private http : HttpClient) { }

  loadAllFolder(){
    return this.http.get<Array<Folder>>("/api/folder");
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
