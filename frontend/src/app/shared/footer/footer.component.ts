import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear?: number;

  constructor( private router: Router) { }

  ngOnInit(): void {

    //getting the current year to show on the copyright
    this.currentYear = new Date().getFullYear();

  }

  //function to check if the route is either sign in, sign up or password reset
  get isSignIn(): boolean {
    return this.router.url === "/auth/signin" || this.router.url === "/auth/signup" || this.router.url === "/auth/forgot-password"
  }

}
