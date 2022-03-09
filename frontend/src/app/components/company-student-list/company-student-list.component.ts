import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  NgbActiveModal,
  NgbModalConfig
} from "@ng-bootstrap/ng-bootstrap";
import {StudentInternsService} from '../../services/student-interns.service';
import { DOCUMENT } from '@angular/common';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-company-student-list',
  templateUrl: './company-student-list.component.html',
  styleUrls: ['./company-student-list.component.scss']
})
export class CompanyStudentListComponent implements OnInit {

  public Internships = [];
  id?: string;
  student: any;
  username: any;
  search: any;
  students_interns: any;
  students: string[] = [];
  intern: any;
  interns: string[] = [];
  showAlert?: boolean;
  title?: string;
  public companyData: any;


  constructor(public studentService: StudentInternsService,     private activeModal: NgbActiveModal, private router: Router,
    ) { }

  ngOnInit(): void {

    this.allInternStudents();
    this.allNotAdmittedInternStudents();
  }



  editRecord(students_interns: any) {


    const datatosave = {
      editStudent: true,
      students_interns
    }

    //saving data in the local storage
    localStorage.setItem('INTERNSHIPdata', JSON.stringify(datatosave));


    //routing the admin to the registration component
    setTimeout(() => {
      this.router.navigate(['/companyEditStudentDetails']);
    }, 500);
  }

  


  allInternStudents(){

    this.companyData = JSON.parse(localStorage.getItem('userdata') || '{}');

    console.log('registration number', this.companyData.registration_number);

    this.studentService.getAllInternsByOrganization(this.companyData.registration_number)
    .subscribe((data:any) => {
      if ( data.match && data.success ) {
      // this.Users.push(result);
    

       console.log('result', data);
    
    
        document.title = "Company: Post New Internship"
    
    
    
          
          data.students_interns.forEach((val: any) =>
          
          this.students.push(val));

      //  console.log('company', this.companyData.email);
     }  

     else {


     }


    });
  }




  allNotAdmittedInternStudents(){

    this.companyData = JSON.parse(localStorage.getItem('userdata') || '{}');

    console.log('registration number', this.companyData.registration_number);

    this.studentService.getAllNotAdmittedInternsPerOrganization(this.companyData.registration_number)
    .subscribe((data:any) => {
      if ( data.match && data.success ) {
      // this.Users.push(result);
    

       console.log('result', data);
    
    
        document.title = "Company: Post New Internship"
    
    
    
          
          data.students_interns.forEach((val: any) =>
          
          this.interns.push(val));

      //  console.log('company', this.companyData.email);
     }  

     else {


     }


    });
  }


   //download method
   download(student_document: any){

    


    this.studentService.download(student_document).subscribe((data: any) => {

        saveAs(data, `Student Documents ${new Date().toLocaleDateString('en-GB')}.pdf`)
       

    });

  }
  
}
