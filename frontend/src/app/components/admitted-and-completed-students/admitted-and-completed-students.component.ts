import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {StudentInternsService} from '../../services/student-interns.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-admitted-and-completed-students',
  templateUrl: './admitted-and-completed-students.component.html',
  styleUrls: ['./admitted-and-completed-students.component.scss']
})
export class AdmittedAndCompletedStudentsComponent implements OnInit {

  submitted = false;
  valid = false;
  username: any;
  search: any;
  data: any;
  completed_interns: any[] = [];
  showAlert?: boolean;
  number4: any;
  totalInternship: any;
  student_intern: any;



  constructor(

    @Inject(DOCUMENT) private document: Document, 
    public studentService: StudentInternsService
  ) { }

  ngOnInit(): void {
    this.getAllCompletedInterns();
  }

  getAllCompletedInterns() {
    this.studentService.getAllCompletedInterns()
      .subscribe((result: any) => {
        result.students_interns.forEach((val: any) => 
        
          this.completed_interns.push(val));

          this.number4 = result.count;

 
      });
  }

     //download method
     download(student_document: any){

      this.studentService.download(student_document).subscribe((data: any) => {
  
          saveAs(data, `Student Documents ${new Date().toLocaleDateString('en-GB')}.pdf`)
         
  
      });
  
    }

}
