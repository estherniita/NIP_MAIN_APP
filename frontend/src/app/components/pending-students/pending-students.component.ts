import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
// import { UsersService } from '../../services/users.service';
import { DOCUMENT } from '@angular/common';
import {StudentInternsService} from '../../services/student-interns.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-pending-students',
  templateUrl: './pending-students.component.html',
  styleUrls: ['./pending-students.component.scss']
})
export class PendingStudentsComponent implements OnInit {

  submitted = false;
  valid = false;
  username: any;
  search: any;
  data: any;
  student_interns: any[] = [];
  showAlert?: boolean;
  number: any;
  totalInternship: any;
  student_intern: any;


  constructor(
    @Inject(DOCUMENT) private document: Document, 
    public studentService: StudentInternsService
  ) { }

  ngOnInit(): void {

    this.getAllPendingInterns();

  }

  getAllPendingInterns() {
    this.studentService.getAllPendingInterns()
      .subscribe((result: any) => {

        result.students_interns.forEach((val: any) => 
       
          this.student_interns.push(val));
      });
  }

  
   //download method
   download(student_document: any){

    this.studentService.download(student_document).subscribe((data: any) => {

        saveAs(data, `Student Documents ${new Date().toLocaleDateString('en-GB')}.pdf`)
       

    });

  }


    //method to download the excel report for pending students
    async downloadStudentInterns() {
    
  
  
      await this.studentService.downloadStudentInterns()
        .subscribe((data: any )=>
  
          saveAs(data, 'Pending student list.csv')
          , (err: any) => {
            alert("Problem while downloading the file.");
            console.error(err);
          });
    }

}
