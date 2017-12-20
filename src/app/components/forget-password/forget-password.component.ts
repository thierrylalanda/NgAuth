import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, FormGroup , Validators } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS} from '@angular/material/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<ForgetPasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private adapter: DateAdapter<any>) {
    this.loginForm = fb.group({
      username: [null , Validators.required],
      email: [null , Validators.compose([Validators.required, Validators.minLength(7), Validators.email])],
      date: [null , Validators.compose([Validators.minLength(10)])]
    });
    this.adapter.setLocale('fr');
  }

  ngOnInit() {

  }

  onCloseConfirm() {
    this.dialogRef.close('vous serez notifié dans quelques minutes');
  }
  onCloseCancel() {
    this.dialogRef.close('procedure de recuperation de mot de passe abandonné');
  }

}
