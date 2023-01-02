import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppUser } from '../model/appuser.model';
import { LoginModel } from '../model/login.model';
import { addError } from '../state/error.action';

@Injectable({
  providedIn: 'root'
})
export class AppuserService {


  constructor(private store: Store, private http: HttpClient) { }

  login(credentials: LoginModel): Observable<AppUser> {
    return this.http.post<AppUser>("/api/appuser/login", credentials);
  }

  register(user: AppUser): Observable<AppUser> {
    console.log("Hey :)");
    return this.http.post<AppUser>("/api/appuser/register", user);
  }

  tryReLogin(): Observable<AppUser> {
    return this.http.get<AppUser>("/api/appuser/relogin");
  }

  logout() {
    let _req = this.http.get("/api/appuser/logout");
    window.location.replace("./login");
    return _req;
  }

  getAppUser(emailOrUsername: string): Observable<AppUser> {
    return this.http.get<AppUser>("/api/appuser/getid?identifier=" + emailOrUsername);
  }

  getAppUserById(id: string): Observable<AppUser> {
    return this.http.get<AppUser>("/api/appuser?id=" + id);
  }
  
}
