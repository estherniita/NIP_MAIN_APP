import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService} from '../../services/users.service';
import { AdminAuthenticationService } from '../../services/admin-authentication.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {

  data: any;
  public companyData: any;

  constructor(private router: Router, public adminAuthenticationService: AdminAuthenticationService) { }

  ngOnInit(): void {
  }

  sendAvailableInternships(data: any) {

    const datatosave = {
      sendNewRequest: true,
      data
    }

    this.companyData = JSON.parse(localStorage.getItem('userdata') || '{}');
    //saving data in the local storage
    // localStorage.setItem('ADMINdata', JSON.stringify(datatosave));
    localStorage.setItem('companyData', JSON.stringify(datatosave));

    this.router.navigate(['/companiesPost'])
  }

}
