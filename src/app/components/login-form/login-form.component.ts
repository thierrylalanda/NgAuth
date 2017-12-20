import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup , Validators } from '@angular/forms';
import {Router, ActivatedRoute } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AlertService} from '../../services/alert.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ForgetPasswordComponent} from '../forget-password/forget-password.component';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
 loginForm: FormGroup;
  model: any = {};
  loading = false;
  returnUrl: string ;
  hide = true;
  resultRetrive: any;
  constructor( private fb: FormBuilder, public router: Router, private auth: AuthService, private route: ActivatedRoute,
               private authenticationService: AuthService,
               private alertService: AlertService,
                public dialog: MatDialog, public snackBar: MatSnackBar) {
  this.loginForm = fb.group({
  username: [null , Validators.required],
    password: [null , Validators.compose([Validators.required, Validators.minLength(7)])]
  });

  }
  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/index';
  }
  login() {
    this.loading = true;
    this.authenticationService.login(this.loginForm)
      .subscribe(
        data => {
          console.log(this.authenticationService.getAcces());
          this.router.navigate([this.returnUrl]);

        },
        error => {
          this.alertService.error(error);
          this.loading = false;

        });
  }
  // retrouver le mot de passe
  retrivePassword() {
    const datas= {text : 'donnée passé au composant', url : 'lalanda/id' };
    const dialogRef = this.dialog.open(ForgetPasswordComponent, {
   width: '600px',
      hasBackdrop:false,
      autoFocus:true,
      backdropClass: 'static',
      data: datas
    });
    dialogRef.afterClosed().subscribe(result => {
      this.snackBar.open(result, 'connecter vous', {
        duration: 5000,
      });

    });
  }
}
