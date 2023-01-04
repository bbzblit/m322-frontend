import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppUser } from 'src/app/model/appuser.model';
import { logout, tryReLogin } from 'src/app/state/auth.action';
import { selectAuthUser } from 'src/app/state/auth.selector';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private store : Store) { }

  public isLogedIn :boolean = false;
  
  private nonLoginSites : Array<String> = ['/login', "/sing-up", "/"]

  ngOnInit(): void {
    let path =  "/" + window.location.href.replace (/^[a-z]{4,5}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1');
    if(this.nonLoginSites.indexOf(path) == -1) {
      this.store.dispatch(tryReLogin());
    }
      this.store.select(selectAuthUser).subscribe(me => this.isLogedIn = Object.keys(me).length !== 0);
  }

  async initLogoutFlow(){
    this.store.dispatch(logout());
  }
}
