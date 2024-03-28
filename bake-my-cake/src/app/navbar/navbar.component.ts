import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  //initialize the isloggedin value as false
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private routerService:RouterService) { }

  onLoggedIn($event: any) {
    //assign the login status value from the authservise to isloggedin variable when the event recieved from the login component
    this.isLoggedIn = this.authService.isLoggedIn();  
  }

  //function called when the used clicks the logout button
  logout() {
    this.authService.logout();  //call the logout function in authservice to change the loginstatus in service
    this.isLoggedIn = this.authService.isLoggedIn();  //change the login status value to false
    this.routerService.navigateToLoginView(); //navigate to login view
  }
  
}
