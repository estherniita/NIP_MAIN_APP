import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {StudentInternsService} from '../../services/student-interns.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-not-admitted-students',
  templateUrl: './not-admitted-students.component.html',
  styleUrls: ['./not-admitted-students.component.scss']
})
export class NotAdmittedStudentsComponent implements OnInit {

  submitted = false;
  valid = false;
  username: any;
  search: any;
  data: any;
  notAdmitted_interns: any[] = [];
  showAlert?: boolean;
  number: any;
  totalInternship: any;
  student_intern: any;


  constructor(
    @Inject(DOCUMENT) private document: Document, 
    public studentService: StudentInternsService
  ) { }

  ngOnInit(): void {

    this.getAllNotAdmittedInterns();
  }

  getAllNotAdmittedInterns() {
    this.studentService.getAllNotAdmittedInterns()
      .subscribe((result: any) => {
        result.students_interns.forEach((val: any) => 
        
          this.notAdmitted_interns.push(val));
 
      });
  }

     //download method
     download(student_document: any){

      this.studentService.download(student_document).subscribe((data: any) => {
  
          saveAs(data, `Student Documents ${new Date().toLocaleDateString('en-GB')}.pdf`)
         
  
      });
  
    }

}
