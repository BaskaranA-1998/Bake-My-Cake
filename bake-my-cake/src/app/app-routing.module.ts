import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderViewComponent } from './order-view/order-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderListComponent } from './order-list/order-list.component';
import { LoginEmpComponent } from './login-emp/login-emp.component';
import { AuthGuard } from './services/auth.guard';
import { CanDeactivateGuard } from './services/can-deactivate.guard';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "order/:id",
    component: OrderViewComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: "order-details/:id",
    component: OrderDetailsComponent
  },
  {
    path: "login",
    component: LoginEmpComponent
  },
  {
    path: "order-list",
    component: OrderListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full"
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
