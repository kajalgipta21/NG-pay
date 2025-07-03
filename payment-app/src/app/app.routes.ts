import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { Register } from './register/register';
import { Login } from './login/login';
// import { deleteth } from './deleteth/deleteth';
import { Checkb } from './checkb/checkb';

import { AddMoney } from './addmoney/addmoney';
import { Dashboard } from './dashboard/dashboard';
import { PayMoney } from './paymoney/paymoney';
import { Seeth } from './seeth/seeth';
import { Deleteth } from './deleteth/deleteth';

export const routes: Routes = [
    // { path: '', redirectTo: 'login',pathMatch: 'full' },
    { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },
  { path: 'addmoney', component: AddMoney },
  { path: 'paymoney', component: PayMoney },
  { path: 'checkb', component: Checkb },
  { path: 'seeth', component: Seeth },
  { path: 'deleteth', component: Deleteth },
];

