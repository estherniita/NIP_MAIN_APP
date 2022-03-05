import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  NgbActiveModal,
  NgbModalConfig
} from "@ng-bootstrap/ng-bootstrap";
import {StudentInternsService} from '../../services/student-interns.service';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  public Internships = [];
  id?: string;
  student: any;
  username: any;
  search: any;
  students_interns: any;
  students: string[] = [];
  showAlert?: boolean;
  title?: string;

  constructor(public studentService: StudentInternsService,     private activeModal: NgbActiveModal,
    ) { }

  ngOnInit(): void {

    this.allInternStudents();
  }

  


  allInternStudents(){

    this.studentService.getAllStudentInterns()
    .subscribe((result:any) => {
      // this.Users.push(result);
      result.students_interns.forEach((val: any) => this.students.push(val));
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
