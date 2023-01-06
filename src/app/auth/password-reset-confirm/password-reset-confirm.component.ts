import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, USER_RUNTIME_CHECKS } from '@ngrx/store';
import { resetPassword } from 'src/app/state/appUser.action';
import { selectAuthUser } from 'src/app/state/auth.selector';

@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['./password-reset-confirm.component.scss']
})
export class PasswordResetConfirmComponent implements OnInit {

  resetPasswordForm = new FormGroup({
    password: new FormControl("", [Validators.required]),
    retypePassword : new FormControl("", [Validators.required])
  });

  public passwordHide : boolean = true;
  public retypePasswordHide : boolean = true;
  constructor(private route: ActivatedRoute, private store : Store) { }

  ngOnInit(): void {
    this.store.select(selectAuthUser).subscribe(appUser => {
      if(Object.keys(appUser).length !== 0){window.location.replace("./login");}
   });
  }

  initReset(){
    this.store.dispatch(resetPassword({ password : this.resetPasswordForm.getRawValue().password , otp : this.route.snapshot.paramMap.get("otp")}))
    this.resetPasswordForm.reset();
  }

}
