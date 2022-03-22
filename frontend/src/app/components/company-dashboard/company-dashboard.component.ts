import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService} from '../../services/users.service';
import { AdminAuthenticationService } from '../../services/admin-authentication.service';
import { InternshipsService } from '../../services/internships.service';
import {StudentInternsService} from '../../services/student-interns.service';


@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {


  username: any;
  search: any;
  data: any;
  totalInternships: any[] = [];
  totalInternshipPosts: any[] = [];
  totalInternship: any;
  totalAvailableInternships: any;
  showAlert?: boolean;
  number: any;
  loading = false;
  isSuccessful = false;
  showModal?: boolean;
  public companyData: any;
  student: any;
  students_interns: any;
  students: any[] = [];
  pending: any[] = [];
  admitted: any[] = [];
  intern: any;
  interns: any[] = [];

  constructor(public studentService: StudentInternsService, private router: Router, public adminAuthenticationService: AdminAuthenticationService, private internshipService: InternshipsService,
    ) { }

  ngOnInit(): void {

    this.getTotalAvailableInternships();
    this.getTotalAvailableInternshipPost();
    this.allInternStudents();
    this.allNotAdmittedInternStudents();
    this.getAllPendingInternsByOrganization();
    this.getTotalAdmittedInternsPerOrganization();

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



  getTotalAvailableInternshipPost() {
    this.internshipService.getTotalAvailableInternshipPost()
      .subscribe((result: any) => {


        // const data = JSON.parse(localStorage.getItem('userdata'));

        result.totalAvailableInternshipPost.forEach((val: any) => 
          // this.number = result.Total_availablenternship;
          // this.data = data.availableInternship;
          this.totalInternshipPosts.push(val));

          console.log('totalinternshipPost', this.totalInternshipPosts );

 

        // this.spinner.hide();
      });
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


  allInternStudents(){

    this.companyData = JSON.parse(localStorage.getItem('userdata') || '{}');

    console.log('registration number', this.companyData.registration_number);

    this.studentService.getTotalInternsPerOrganization(this.companyData.registration_number)
    .subscribe((data:any) => {
      if ( data.match && data.success ) {
      // this.Users.push(result);
    

       console.log('result', data);
        
    
    
          
          data.students_interns.forEach((val: any) =>
          
          this.students.push(val));

      //  console.log('company', this.companyData.email);
     }  

     else {


     }


    });
  }

  

  getTotalAdmittedInternsPerOrganization(){

    this.companyData = JSON.parse(localStorage.getItem('userdata') || '{}');

    console.log('registration number', this.companyData.registration_number);

    this.studentService.getTotalAdmittedInternsPerOrganization(this.companyData.registration_number)
    .subscribe((data:any) => {
      if ( data.match && data.success ) {
      // this.Users.push(result);
    

       console.log('result', data);
    
    
          
          data.students_interns.forEach((val: any) =>
          
          this.admitted.push(val));

      //  console.log('company', this.companyData.email);
     }  

     else {


     }

    });
  }


  getAllPendingInternsByOrganization(){

    this.companyData = JSON.parse(localStorage.getItem('userdata') || '{}');

    console.log('registration number', this.companyData.registration_number);

    this.studentService.getAllPendingInternsByOrganization(this.companyData.registration_number)
    .subscribe((data:any) => {
      if ( data.match && data.success ) {
      // this.Users.push(result);
    

       console.log('result', data);
    
    
        document.title = "Company: Company Dashboard"
    
    
    
          
          data.students_interns.forEach((val: any) =>
          
          this.pending.push(val));

      //  console.log('company', this.companyData.email);
     }  

     else {


     }


    });
  }


  

  allNotAdmittedInternStudents(){

    this.companyData = JSON.parse(localStorage.getItem('userdata') || '{}');

    console.log('registration number', this.companyData.registration_number);

    this.studentService.getTotalNotAdmittedInternsPerOrganization(this.companyData.registration_number)
    .subscribe((data:any) => {
      if ( data.match && data.success ) {
      // this.Users.push(result);
    

       console.log('result', data);
    
    
        document.title = "Company Dashboard"
    
    
    
          
          data.students_interns.forEach((val: any) =>
          
          this.interns.push(val));

      //  console.log('company', this.companyData.email);
     }  

     else {


     }


    });
  }


}
