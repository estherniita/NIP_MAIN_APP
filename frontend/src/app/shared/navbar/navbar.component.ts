import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService} from '../../services/users.service';
import {AdminAuthenticationService} from '../../services/admin-authentication.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public user: any;
  username: any;
  public isCollapsed = false;
  public sessionNotExp: boolean = false;
  public isMenuCollapsed = true;


  @ViewChild('nav')
  navigation?: ElementRef;

  @ViewChild('toggler')
  toggler?: ElementRef;

  navOpen = false;

  constructor(private renderer: Renderer2, private route: Router, public userService: UsersService, public adminAuthenticationService: AdminAuthenticationService) { }

  ngAfterViewInit() {
    if (this.isCollapsed) {
      this.isCollapsed = false;
    }
  }
  
  ngOnInit(): void {
  }

  // funtion to toggle the side nav bar in mobile version
  toggleNav() {
    this.navOpen = !this.navOpen;
    if (this.navOpen) {
      this.renderer.addClass(document.body, 'mobile-nav-active');
    } else {
      this.renderer.removeClass(document.body, 'mobile-nav-active');
    }
  }

  collapse(event: any) {
  }

  //function to check if the current route is sign in, sign up or reset password pages
  get isSignIn(): boolean {
    return this.route.url === "/auth/signin" ||  this.route.url === "/auth/signup";
  }

  logout() {

    // storing the user data in the local storage
    const data = JSON.parse(localStorage.getItem('userdata')!);



        // removing the userdata from the localstorage
        localStorage.removeItem('userdata');
        this.username = '';
        this.sessionNotExp = true;
        this.route.navigate(['/auth/signin']);
        this.closeCollapse();
  
  }

  // method that is used to redirect the user to landing page or dashboard
  redirect() {
    const user = JSON.parse(localStorage.getItem('userdata')!);
    if (user) {
      if (user.user.role === 'user') {
        this.route.navigate(['/admin-dashboard']);
      } else if (!user.user.role) {
        this.route.navigate(['/auth/signin']);
      }
    } else {
      this.route.navigate(['/home']);
    }
    this.closeCollapse();

  }

  closeCollapse() {
    this.isCollapsed = false;
  }



}
