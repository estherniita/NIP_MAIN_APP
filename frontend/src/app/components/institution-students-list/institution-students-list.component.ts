import { Component, OnInit } from '@angular/core';
import {StudentInternsService} from '../../services/student-interns.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-institution-students-list',
  templateUrl: './institution-students-list.component.html',
  styleUrls: ['./institution-students-list.component.scss']
})
export class InstitutionStudentsListComponent implements OnInit {

  public Internships = [];
  // id: string;
  student: any;
  username: any;
  search: any;
  students_interns: any;
   students = [];
  // showAlert: boolean;
  // title: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router,  
    public studentService: StudentInternsService) { }

    ngOnInit(): void {

      document.title = "Institution received Interships"
  
  
      this.getAllStudentInterns();
    }
  
  
    editRecord(students_interns: any) {
  
  
      const datatosave = {
        sendStudent: true,
        students_interns
      }
  
      //saving students_interns in the local storage
      localStorage.setItem('INTERNSHIPdata', JSON.stringify(datatosave));
  
  
      //routing the admin to the registration component
      setTimeout(() => {
        this.router.navigate(['/students']);
      }, 500);
    }
  
    getAllStudentInterns() {
  
      let user: any;
  
      user = JSON.parse(localStorage.getItem('userdata') || '{}');
  
      if (user.isLoggedin) {
        setTimeout(() => {
  
        switch (user.role) {
  
          case 'adminIUM': { 
      this.studentService.getIUMStudentInterns()
        .subscribe((result:any) => {
          // this.Users.push(result);
          result.students_interns.forEach((val: any) => this.students.push(val as never));
        });
  
        break;
      }
  
  
      case 'adminNUST': { 
        this.studentService.getNUSTStudentInterns()
          .subscribe((result:any) => {
            // this.Users.push(result);
            result.students_interns.forEach((val: any) => this.students.push(val as never));
          });
    
          break;
        }
  
  
      case 'adminNIMT': { 
          this.studentService.getNIMTStudentInterns()
            .subscribe((result:any) => {
              // this.Users.push(result);
              result.students_interns.forEach((val: any) => this.students.push(val as never));
            });
      
            break;
          }
  
  
       case 'adminUNAM': { 
        this.studentService.getUNAMStudentInterns()
          .subscribe((result:any) => {
            // this.Users.push(result);
            result.students_interns.forEach((val: any) => this.students.push(val as never));
          });
    
          break;
        }
  
  
  
      case 'adminVTC': { 
        this.studentService.getVTCStudentInterns()
          .subscribe((result:any) => {
            // this.Users.push(result);
            result.students_interns.forEach((val: any) => this.students.push(val as never));
          });
    
          break;
        }   
  
    }
  
  });
  
  }
  
    }
  
  
      //download method
      download(student_document: any){

        this.studentService.download(student_document).subscribe((data: any) => {
    
            saveAs(data, `Student Documents ${new Date().toLocaleDateString('en-GB')}.pdf`)
           
    
        });
    
      }

  
  }
  