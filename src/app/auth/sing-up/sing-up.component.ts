import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppUser } from 'src/app/model/appuser.model';
import { register } from 'src/app/state/appuser.action';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {


  singUpForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(5)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
  });


  register() {
    this.store.dispatch(register(this.singUpForm.value as AppUser))
    console.log(this.singUpForm.value);
  }

  constructor(private store : Store) { }

  ngOnInit(): void {
  }

}
