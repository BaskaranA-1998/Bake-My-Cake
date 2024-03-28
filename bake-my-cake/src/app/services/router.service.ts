import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private routerService: Router) { }

  //method to navigate to home view
  navigateToDashboardView() {
    this.routerService.navigate([""]);
  }

  //method to navigate to login view
  navigateToLoginView() {
    this.routerService.navigate(["login"]);
  }

  //method to navigate to order Details view
  navigateToOrderDetailsView(id: number) {
    this.routerService.navigate([`order-details/${id}`]);
  }

  //method to navigate to order list view
  navigateToOrderRequestView() {
    this.routerService.navigate(["order-list"]);
  }

}
