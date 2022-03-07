import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  NgbActiveModal,
  NgbModalConfig
} from "@ng-bootstrap/ng-bootstrap";
import {StudentInternsService} from '../../services/student-interns.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-company-admitted-completted-student',
  templateUrl: './company-admitted-completted-student.component.html',
  styleUrls: ['./company-admitted-completted-student.component.scss']
})
export class CompanyAdmittedComplettedStudentComponent implements OnInit {
  public Internships = [];
  id?: string;
  student: any;
  username: any;
  search: any;
  students_interns: any;
  students: string[] = [];
  showAlert?: boolean;
  title?: string;
  public companyData: any;

  constructor(public studentService: StudentInternsService,     private activeModal: NgbActiveModal, private router: Router,
    ) { }

  ngOnInit(): void {

    this.allAdmittedInternStudents();
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

  


  allAdmittedInternStudents(){

    this.companyData = JSON.parse(localStorage.getItem('userdata') || '{}');

    console.log('registration number', this.companyData.registration_number);

    this.studentService.getAllAdmittedInternsPerOrganization(this.companyData.registration_number)
    .subscribe((data:any) => {
      if ( data.match && data.success ) {
      // this.Users.push(result);
    

       console.log('result', data);
    
    
        // document.title = "Company: Post New Internship"
    
    
    
          
          data.students_interns.forEach((val: any) =>
          
          this.students.push(val));

      //  console.log('company', this.companyData.email);
     }  

     else {


     }


    });
  }

   //download method
   downloadStudentDocuments() {
    let link = document.createElement("a");
    link.download = "NIP-1646079281222.pdf.pdf";
    link.href = "assets/Documents/students/NIP-1646079281222.pdf";
    link.click();

    this.activeModal.dismiss();

  }
  
}
