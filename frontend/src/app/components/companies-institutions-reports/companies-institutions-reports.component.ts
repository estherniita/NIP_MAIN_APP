import { Component, OnInit } from '@angular/core';
import {StudentInternsService} from '../../services/student-interns.service';

@Component({
  selector: 'app-companies-institutions-reports',
  templateUrl: './companies-institutions-reports.component.html',
  styleUrls: ['./companies-institutions-reports.component.scss']
})
export class CompaniesInstitutionsReportsComponent implements OnInit {
  public Internships = [];
  id?: string;
  student: any;
  candidate: any;
  username: any;
  search: any;
  students_interns: any;
  students: any[] = [];
  candidates: any[] = [];
  showAlert?: boolean;
  title?: string;


  constructor(public studentService: StudentInternsService) { }

  ngOnInit(): void {

    this.getAllStudentsByInstiOrga();
    this.getAllStudentsByOrga();

  }

  getAllStudentsByInstiOrga(){

    this.studentService.getAllStudentsByInstiOrga()
    .subscribe((result:any) => {
      // this.Users.push(result);
      result.students_interns.forEach((val: any) => this.students.push(val));
    });
  }

  getAllStudentsByOrga(){

    this.studentService.getAllStudentsByOrga()
    .subscribe((result:any) => {
      // this.Users.push(result);
      result.students_interns.forEach((value: any) => this.candidates.push(value));
    });
  }

}
