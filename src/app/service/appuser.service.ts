import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppUser } from '../model/appuser.model';
import { LoginModel } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class AppuserService {

  constructor(private store : Store, private http : HttpClient) { }

  login(credentials : LoginModel) : Observable<AppUser>{
    return this.http.post<AppUser>("/api/appuser/login", credentials);
  }

  register(user : AppUser) : Observable<AppUser>{
    console.log("Hey :)");
    return this.http.post<AppUser>("/api/appuser/register", user);
  }

  tryReLogin() : Observable<AppUser>{
    return this.http.get<AppUser>("/api/appuser/relogin");
  }
}
