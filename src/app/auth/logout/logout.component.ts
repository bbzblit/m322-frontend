import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/state/appuser.action';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private store : Store) { }

  ngOnInit(): void {
  }

  initLogoutFlow(){
    this.store.dispatch(logout());
    window.location.replace("./login");
  }
}
