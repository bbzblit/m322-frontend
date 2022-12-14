import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PasswordResetConfirmComponent } from './auth/password-reset-confirm/password-reset-confirm.component';
import { SingUpComponent } from './auth/sing-up/sing-up.component';
import { GradesOverviewComponent } from './grades-overview/grades-overview.component';
import { HomeComponent } from './home/home.component';
import { ImpressumComponent } from './static/impressum/impressum.component';
import { PrivacyComponent } from './static/privacy/privacy.component';
import { SupportComponent } from './static/support/support.component';

const routes: Routes = [
  { path: 'login', pathMatch : "full", component: LoginComponent },
  { path: 'sing-up', pathMatch : "full", component: SingUpComponent },
  { path: 'home', pathMatch : "full", component: HomeComponent},
  { path : 'edit/:id', pathMatch : "full", component : GradesOverviewComponent},
  { path : 'reset/:otp', pathMatch : "full", component : PasswordResetConfirmComponent},
  { path : "", pathMatch : "full", redirectTo : "/login"},
  { path : "support-us", component : SupportComponent},
  { path : "privacy", component : PrivacyComponent },
  { path : "impressum", component : ImpressumComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
