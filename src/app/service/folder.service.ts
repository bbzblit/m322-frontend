import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Folder } from '../model/folder.model';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private http : HttpClient) { }

  loadAllFolder(){
    return this.http.get<Array<Folder>>("/api/folder");
  }

}
