import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
// import { UsersService } from '../../services/users.service';
import { DOCUMENT } from '@angular/common';
// import { AdminAuthenticationService } from '../../services/admin-authentication.service';
import { InternshipsService } from '../../services/internships.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  new_internshipsForm?: FormGroup;
  submitted = false;
  valid = false;
  username: any;
  search: any;
  data: any;
  totalInternships: any[] = [];
  showAlert?: boolean;
  number: any;
  loading = false;
  isSuccessful = false;
  showModal?: boolean;
  totalInternship: any;


  constructor(
    // private config: NgbModalConfig,   
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router, 
    // private activeModal: NgbActiveModal, 
    private internshipService: InternshipsService,
    @Inject(DOCUMENT) private document: Document, 
    // public userService: UsersService, 
    // public adminAuthenticationService: AdminAuthenticationService
    ) { }

  ngOnInit(): void {

    document.title = "Admin Dashboard: National Internship Program"

    this.getTotalAvailableInternships();

  }

  
  getTotalAvailableInternships() {
    this.internshipService.getTotalAvailableInternships()
      .subscribe((result: any) => {


        // const data = JSON.parse(localStorage.getItem('userdata'));

        result.totalAvailableInternship.forEach((val: any) => 
          // this.number = result.Total_availablenternship;
          // this.data = data.availableInternship;
          this.totalInternships.push(val));
 

        // this.spinner.hide();
      });
  }

  

}
