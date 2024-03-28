import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn: boolean = false;

  constructor() { }

  //method the change the userloginstatus to true for the successful login
  login(loginCode: string) {
    this.isUserLoggedIn =  (loginCode === "101");
  }

  //method the change the userloginstatus to false for the successful logout
  logout() {
    this.isUserLoggedIn = false;
  }

  //method to return the userlogin status when called
  isLoggedIn() {
   return this.isUserLoggedIn;
  }
}
