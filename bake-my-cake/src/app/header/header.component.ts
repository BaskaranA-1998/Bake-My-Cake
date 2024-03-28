import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  //get the login status value from navbar component
  @Input()
  loginStatus: boolean = false;

  constructor(private authService:AuthService, private routerService:RouterService) { }

  //text interpolation for title
  headerTitle: string = "Bake My Cake";

  logout() {
    this.authService.logout();  //call the logout function in authservice to change the loginstatus in service
    this.loginStatus = this.authService.isLoggedIn(); //change the login status value to false
    this.routerService.navigateToLoginView(); //navigate to login view
  }

}
