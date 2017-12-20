/**
 * Created by Administrateur on 12/12/2017.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';


import { AdministrateurComponent } from './Administrateur.component';


const appRoutes: Routes = [
  {
    path: 'administrateur',
    component: AdministrateurComponent,
    canActivate: [AuthGuard]
  }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);
