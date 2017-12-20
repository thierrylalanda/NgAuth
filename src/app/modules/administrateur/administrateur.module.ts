/**
 * Created by Administrateur on 12/12/2017.
 */
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdministrateurComponent } from './administrateur.component';
import {AuthGuardAdmin} from './administrateur.guard';

@NgModule({
  declarations: [
    AdministrateurComponent
  ],
  imports: [
   CommonModule,
    RouterModule.forChild([
      {
        path: 'administrateur',
        component: AdministrateurComponent,
        canActivate: [AuthGuardAdmin]
      }
    ])
  ],
  exports: [CommonModule]
})
export  class AdministrateurModule { }
