import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {StudentInternsService} from '../../services/student-interns.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-admitted-not-completed-students',
  templateUrl: './admitted-not-completed-students.component.html',
  styleUrls: ['./admitted-not-completed-students.component.scss']
})
export class AdmittedNotCompletedStudentsComponent implements OnInit {

  submitted = false;
  valid = false;
  username: any;
  search: any;
  data: any;
  admitted_interns: any[] = [];
  showAlert?: boolean;
  number: any;
  totalInternship: any;
  student_intern: any;

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    public studentService: StudentInternsService
  ) { }

  ngOnInit(): void {

    this.getAllAdmittedInterns();
  }

  getAllAdmittedInterns() {
    this.studentService.getAllAdmittedInterns()
      .subscribe((result: any) => {
        result.students_interns.forEach((val: any) => 
        
          this.admitted_interns.push(val));
 
      });
  }

     //download method
     download(student_document: any){

      this.studentService.download(student_document).subscribe((data: any) => {
  
          saveAs(data, `Student Documents ${new Date().toLocaleDateString('en-GB')}.pdf`)
         
  
      });
  
    }

  }
