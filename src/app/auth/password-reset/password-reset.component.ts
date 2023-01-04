import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { sendResetLink } from 'src/app/state/appUser.action';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PasswordResetComponent>, private store : Store) { }

  public email : string = "";

  ngOnInit(): void {
  }

  sendResetMail(){
    this.store.dispatch(sendResetLink({email : this.email}));
  }

}
