import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  //login
  {
    path:'' , component:LoginComponent
  },
  {
    path:'register', component:RegisterComponent
  },
  {
    path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]
  },
  {
    path:'transactions', component:TransactionsComponent,canActivate:[AuthGuard]
  },
  {
    path:'**', component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
