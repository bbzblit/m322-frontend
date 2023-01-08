import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SingUpComponent } from './auth/sing-up/sing-up.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './state/auth.reducer';
import { AuthEffect } from './state/auth.effect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule,  } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { FolderEffect } from './state/folder.effec';
import { folderReducer } from './state/folder.reducer';
import {MatMenuModule} from '@angular/material/menu';
import { HomeMenuComponent } from './home/home-menu/home-menu.component';
import { HomePopupHelperComponent } from './home/home-popup-helper/home-popup-helper.component';
import {MatDialogModule} from '@angular/material/dialog';
import { LogoutComponent } from './auth/logout/logout.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { GradesOverviewComponent } from './grades-overview/grades-overview.component';
import { GradesPopupHelperComponent } from './grades-overview/grades-popup-helper/grades-popup-helper.component';
import { GradeComponent } from './grades-overview/grade/grade.component'; 
import { GradesMenuComponent } from './grades-overview/grade-menu/grade-menu.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { GradeEffect } from './state/grade.effect';
import {MatChipsModule} from '@angular/material/chips';
import { SharePopupComponent } from './share-popup/share-popup.component';
import {MatRadioModule} from '@angular/material/radio';
import { AppUserEffect } from './state/appUser.effect';
import { appUserReducer } from './state/appUser.reducer';
import { AppuserLookupPipe } from './pipe/appuser-lookup.pipe';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { messageReducer } from './state/message.reducer';
import { PasswordResetConfirmComponent } from './auth/password-reset-confirm/password-reset-confirm.component';
import { SupportComponent } from './static/support/support.component';
import { PrivacyComponent } from './static/privacy/privacy.component';
import { ImpressumComponent } from './static/impressum/impressum.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingUpComponent,
    HomeComponent,
    HomeMenuComponent,
    HomePopupHelperComponent,
    LogoutComponent,
    GradesOverviewComponent,
    GradesPopupHelperComponent,
    GradeComponent,
    GradesMenuComponent,
    SharePopupComponent,
    AppuserLookupPipe,
    PasswordResetComponent,
    PasswordResetConfirmComponent,
    SupportComponent,
    PrivacyComponent,
    ImpressumComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({authUser : authReducer, folder : folderReducer, message : messageReducer, appUser : appUserReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffect, FolderEffect, GradeEffect, AppUserEffect]),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatChipsModule,
    MatRadioModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
