import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';

import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import {HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AdministrateurModule } from './modules/administrateur/administrateur.module';
import { AuthGuardAdmin } from './modules/administrateur/administrateur.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import {AuthService} from './services/auth.service';
import {AlertService} from './services/alert.service';
import { AuthGuard } from './auth.guard';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AlertComponent } from './directives/alert/alert.component';
import { TimePipe } from './filters/time.pipe';
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatCardModule, MatInputModule,
  MatCardActions, MatSnackBarModule, MatProgressSpinnerModule, MatSidenavModule, MatToolbarModule,
  MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatTableModule,
MatPaginatorModule, MatSortModule, MatSliderModule, MatSlideToggleModule, MatListModule} from '@angular/material';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AddUserFormComponent } from './components/add-user-form/add-user-form.component';
import { EditeUserFormComponent } from './components/edite-user-form/edite-user-form.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LoginFormComponent,
    NavBarComponent,
    AlertComponent,
    TimePipe,
    SideNavComponent,
    ForgetPasswordComponent,
    AddUserFormComponent,
    EditeUserFormComponent
  ],
  imports: [
    BrowserModule,
    AppBootstrapModule,
    routing,
    AdministrateurModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatListModule,
    HttpModule
  ],
  entryComponents: [
    ForgetPasswordComponent,
    AddUserFormComponent,
    EditeUserFormComponent
  ],
  providers: [
    AlertService,
    appRoutingProviders, AuthService, AuthGuard, AuthGuardAdmin,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
