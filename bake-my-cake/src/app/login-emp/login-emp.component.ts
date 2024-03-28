import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login-emp',
  templateUrl: './login-emp.component.html',
  styleUrls: ['./login-emp.component.css']
})
export class LoginEmpComponent {

  //define the login code as empty string
  loginCode: string = "";

  //initialize the login message value as false
  loginMsg: boolean = false;

  //initialize the password visibility value as true
  showPassword: boolean = true;

  //text interpolation variable for input type; initialize value as password
  showPasswordType:string = "password";

  @Output() 
  loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(private authService:AuthService, private routeService:RouterService) { }

  ngOnInit(): void {
  }

  validateLoginCredentials() {
    this.authService.login(this.loginCode); //validate the login code

    if(this.authService.isLoggedIn()){
      this.loggedIn.emit(true); //emit the event for toggle the login/logout buttons in header and navbar components

      this.routeService.navigateToOrderRequestView(); //navigate to order list
    } 
    else
      this.loginMsg = true;  //change the login message value to true to display the hint when the user enter the invalid code
  } 
  
  //function to toggle the password visibility
  togglePassword() {
    this.showPassword = !this.showPassword;
    this.showPasswordType = this.showPassword ? "password" : "text";
  }
}
