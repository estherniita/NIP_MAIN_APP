import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {AdminAuthenticationService} from '../../services/admin-authentication.service';


@Component({
  selector: 'app-institution-dashboard',
  templateUrl: './institution-dashboard.component.html',
  styleUrls: ['./institution-dashboard.component.scss']
})
export class InstitutionDashboardComponent implements OnInit {

  constructor(  private router: Router,
    @Inject(DOCUMENT) private document: Document, public userService: UsersService, public adminAuthenticationService: AdminAuthenticationService) { }

  ngOnInit(): void {

    document.title = "Institution Dashboard"

  }

  // const data = JSON.parse(localStorage.getItem('userdata'));

}
