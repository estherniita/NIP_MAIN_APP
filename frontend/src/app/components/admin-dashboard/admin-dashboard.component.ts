import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
// import { UsersService } from '../../services/users.service';
import { DOCUMENT } from '@angular/common';
// import { AdminAuthenticationService } from '../../services/admin-authentication.service';
import { InternshipsService } from '../../services/internships.service';
import {StudentInternsService} from '../../services/student-interns.service';


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
  student_interns: any[] = [];
  notAdmitted_interns: any[] = [];
  admitted_interns: any[] = [];
  completed_interns: any[] = [];
  total_requests: any[] = [];
  showAlert?: boolean;
  number1: any;
  number2: any;

  number3: any;

  number4: any;

  loading = false;
  isSuccessful = false;
  showModal?: boolean;
  totalInternship: any;
  student_intern: any;
  


  constructor(
    // private config: NgbModalConfig,   
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router, 
    // private activeModal: NgbActiveModal, 
    private internshipService: InternshipsService,
    @Inject(DOCUMENT) private document: Document, 
    public studentService: StudentInternsService
    // public userService: UsersService, 
    // public adminAuthenticationService: AdminAuthenticationService
    ) { }

  ngOnInit(): void {

    document.title = "Admin Dashboard: National Internship Program"

    this.getTotalAvailableInternships();
    this.getAllPendingInterns();
    this.getAllNotAdmittedInterns();
    this.getAllAdmittedInterns();
    this.getAllCompletedInterns();
    this.getTotalRequestSentToInstitution();

  }

  
  getTotalAvailableInternships() {
    this.internshipService.getTotalAvailableInternships()
      .subscribe((result: any) => {

        result.totalAvailableInternship.forEach((val: any) => 
          this.totalInternships.push(val));
      });
  }


  getTotalRequestSentToInstitution() {
    this.internshipService.getTotalRequestSentToInstitution()
      .subscribe((result: any) => {

        result.requests.forEach((val: any) => 
          this.total_requests.push(val));
      });
  }


  getAllPendingInterns() {
    this.studentService.getAllPendingInterns()
      .subscribe((result: any) => {

        result.students_interns.forEach((val: any) => 
       
          this.student_interns.push(val));

          this.number1 = result.count;

      });
  }


  getAllNotAdmittedInterns() {
    this.studentService.getAllNotAdmittedInterns()
      .subscribe((result: any) => {
        result.students_interns.forEach((val: any) => 
        
          this.notAdmitted_interns.push(val));

          this.number2 = result.count;

 
      });
  }


  getAllAdmittedInterns() {
    this.studentService.getAllAdmittedInterns()
      .subscribe((result: any) => {
        result.students_interns.forEach((val: any) => 


          this.admitted_interns.push(val));

          this.number3 = result.count;

 
      });
  }



  getAllCompletedInterns() {
    this.studentService.getAllCompletedInterns()
      .subscribe((result: any) => {
        result.students_interns.forEach((val: any) => 
        
          this.completed_interns.push(val));

          this.number4 = result.count;

 
      });
  }

  

}
