import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { resetPassword } from 'src/app/state/appUser.action';

@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['./password-reset-confirm.component.scss']
})
export class PasswordResetConfirmComponent implements OnInit {

  resetPasswordForm = new FormGroup({
    email : new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    
  });

  public passwordHide : boolean = true;
  public retypePasswordHide : boolean = true;
  constructor(private route: ActivatedRoute, private store : Store) { }

  ngOnInit(): void {
  }

  initReset(){
    this.store.dispatch(resetPassword({...this.resetPasswordForm.getRawValue(), otp : this.route.snapshot.paramMap.get("otp")}))
  }

}
