import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, FormGroup , Validators } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS} from '@angular/material/core';

@Component({
  selector: 'app-edite-user-form',
  templateUrl: './edite-user-form.component.html',
  styleUrls: ['./edite-user-form.component.css']
})
export class EditeUserFormComponent implements OnInit {

  addUserForm: FormGroup;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditeUserFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private adapter: DateAdapter<any>) {
    this.adapter.setLocale('fr');
    this.addUserForm = fb.group({
      username: [null , Validators.required],
      email: [null , Validators.compose([Validators.required, Validators.minLength(7), Validators.email])],
      date: [null , Validators.compose([Validators.minLength(10)])]
    });
  }

  ngOnInit() {
  }
  onCloseConfirm() {
    this.dialogRef.close('utilisateur mis à jour avec succes');
  }
  onCloseCancel() {
    this.dialogRef.close('procedure de mise à jour abandonné');
  }
}
