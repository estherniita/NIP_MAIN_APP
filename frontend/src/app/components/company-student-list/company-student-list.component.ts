import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  NgbActiveModal,
  NgbModalConfig
} from "@ng-bootstrap/ng-bootstrap";
import {StudentInternsService} from '../../services/student-interns.service';
import { DOCUMENT } from '@angular/common';

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
  showAlert?: boolean;
  title?: string;
  public companyData: any;


  constructor(public studentService: StudentInternsService,     private activeModal: NgbActiveModal, private router: Router,
    ) { }

  ngOnInit(): void {

    this.allInternStudents();
  }

  


  allInternStudents(){

    this.studentService.getAllStudentInterns()
    .subscribe((result:any) => {
      // this.Users.push(result);
    

      this.companyData = JSON.parse(localStorage.getItem('userdata') || '{}');

       console.log('result', result);
    
    
        document.title = "Company: Post New Internship"
    
        if (this.companyData === undefined ||  this.companyData === null) {
          this.router.navigate(['/companies'])
        } else if (this.companyData.isLoggedin) {
    
          
          result.students_interns.forEach((val: any) =>
          
          this.students.push(val));

      //  console.log('company', this.companyData.email);
    
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
