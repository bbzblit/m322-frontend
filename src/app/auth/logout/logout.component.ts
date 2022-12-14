import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppUser } from 'src/app/model/appuser.model';
import { logout, tryReLogin } from 'src/app/state/appuser.action';
import { selectAppUser } from 'src/app/state/appuser.selector';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private store : Store) { }

  public isLogedIn :boolean = false;
  ngOnInit(): void {
    this.store.dispatch(tryReLogin());
    this.store.select(selectAppUser).subscribe(me => this.isLogedIn = Object.keys(me).length !== 0);
  }

  async initLogoutFlow(){
    this.store.dispatch(logout());
  }
}
