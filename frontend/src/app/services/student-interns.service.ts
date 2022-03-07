 
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StudentInternsService {

  studentInterns?: Object;
  institution?: String;
  studentdata: any;
  private userMessage = new BehaviorSubject({});
  private server_url = environment.serverUrl;

  constructor(private http: HttpClient,
    private router: Router) { }


    
  nextUserMessage(message: string) {
    this.userMessage.next(message)
  }

//method to inserting new student details
  newStudentInterns1(studentInterns: any): any {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // Authorization: this.token
        })
      };
  
      return this.http
        .post(this.server_url + 'student_interns/newStudentInterns', studentInterns, {
          headers: httpOptions.headers
        })
        .pipe(map(res => res));
    }


    newStudentInterns(firstname: string, surname: string, idNo_or_passportNo: string, student_number: string, student_email: string, student_phoneNumber: string, institution: string,
      field_of_study: string, internships_name: string, company: string, town_city: string, company_email: string, company_registrationNo: string, completion: string, admission: string, student_document: any): any {
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Content-Type': 'application/json',
      //     // Authorization: this.token
      //   })
      // };

      const formData = new FormData();
      formData.append('firstname', firstname);
      formData.append('surname', surname);
      formData.append('idNo_or_passportNo', idNo_or_passportNo);
      formData.append('student_number', student_number);
      formData.append('student_email', student_email);
      formData.append('student_phoneNumber', student_phoneNumber);
      formData.append('institution', institution);
      formData.append('field_of_study', field_of_study);
      formData.append('internships_name', internships_name);
      formData.append('company', company);
      formData.append('town_city', town_city);
      formData.append('company_email', company_email);
      formData.append('company_registrationNo', company_registrationNo);
      formData.append('completion', completion);
      formData.append('admission', admission);
      formData.append('student_document', student_document);
  
      return this.http
        .post(this.server_url + 'student_interns/newStudentInterns', formData)
        .toPromise();
    }


    // updateStudentDetails(firstname: string, surname: string, idNo_or_passportNo: string, student_number: string, student_email: string, student_phoneNumber: string, institution: string,
    //   field_of_study: string, internships_name: string, company: string, town_city: string, company_email: string, company_registrationNo: string, completion: string, admission: string, student_document: any, id:any): any  {
    //   // const httpOptions = {
    //   //   headers: new HttpHeaders({
    //   //     'Content-Type': 'application/json',
    //   //     // Authorization: this.token
    //   //   })
    //   // };

    //   const formData = new FormData();
    //   formData.append('firstname', firstname);
    //   formData.append('surname', surname);
    //   formData.append('idNo_or_passportNo', idNo_or_passportNo);
    //   formData.append('student_number', student_number);
    //   formData.append('student_email', student_email);
    //   formData.append('student_phoneNumber', student_phoneNumber);
    //   formData.append('institution', institution);
    //   formData.append('field_of_study', field_of_study);
    //   formData.append('internships_name', internships_name);
    //   formData.append('company', company);
    //   formData.append('town_city', town_city);
    //   formData.append('company_email', company_email);
    //   formData.append('company_registrationNo', company_registrationNo);
    //   formData.append('completion', completion);
    //   formData.append('admission', admission);
    //   formData.append('student_document', student_document);
  
    //   return this.http
    //     .put(this.server_url + `student_interns/updateStudentDetails/${id}`, formData)
    //     .toPromise();
    // }

//method to get interns by institution name
    getStudentByInstitution(institution: any) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // Authorization: this.token
        })
      };
  
      return this.http
        .post(this.server_url + 'student_interns/getStudentByInstitution', institution, {
          headers: httpOptions.headers
        })
        .pipe(map(res => res));
    }
  
  
    //method to get all submitted students
  
    getAllStudentInterns() {
      const httpOptions1 = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          // Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url + 'student_interns/getAllStudentInterns', {
          headers: httpOptions1.headers
        })
        .pipe(map(res => res));
     
    }

    getIUMStudentInterns() {
      const httpOptions1 = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          // Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url + 'student_interns/getIUMStudentInterns', {
          headers: httpOptions1.headers
        })
        .pipe(map(res => res));
     
    }

    getNUSTStudentInterns() {
      const httpOptions1 = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          // Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url + 'student_interns/getNUSTStudentInterns', {
          headers: httpOptions1.headers
        })
        .pipe(map(res => res));
      
    }

    getNIMTStudentInterns() {
      const httpOptions1 = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          // Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url + 'student_interns/getNIMTStudentInterns', {
          headers: httpOptions1.headers
        })
        .pipe(map(res => res));
      
    }

    getUNAMStudentInterns() {
      const httpOptions1 = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          // Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url + 'student_interns/getUNAMStudentInterns', {
          headers: httpOptions1.headers
        })
        .pipe(map(res => res));
      
    }


    getVTCStudentInterns() {
      const httpOptions1 = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          // Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url + 'student_interns/getVTCStudentInterns', {
          headers: httpOptions1.headers
        })
        .pipe(map(res => res));
      
    }

    

    getAllStudentsByInstiOrga() {
      const httpOptions1 = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          // Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url + 'student_interns/getAllStudentsByInstiOrga', {
          headers: httpOptions1.headers
        })
        .pipe(map(res => res));
      
    }

    

    getAllStudentsByOrga() {
      const httpOptions1 = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          // Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url + "student_interns/getAllStudentsByOrga", {
          headers: httpOptions1.headers
        })
        .pipe(map(res => res));
      
    }


    

        //method to get iterms by organizations
        getAllInternsByOrganization(registration_number: any): any {
          const data = {
            registration_number
          };
      
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              // Authorization: this.token
            })
          };
      
          return this.http
            .post(this.server_url + 'student_interns/getAllInternsByOrganization', data, {
              headers: httpOptions.headers
            })
      
            .pipe(map(res => res));
        }


        getAllAdmittedInternsPerOrganization(registration_number: any): any {
          const data = {
            registration_number
          };
      
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              // Authorization: this.token
            })
          };
      
          return this.http
            .post(this.server_url + 'student_interns/getAllAdmittedInternsPerOrganization', data, {
              headers: httpOptions.headers
            })
      
            .pipe(map(res => res));
        }

        
  
      //method to update student details
      updateStudentDetails(id:any, data:any) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
        
          })
        };
    
        return this.http
          .put(this.server_url + `student_interns/updateStudentDetails/${id}`, data, {
            headers: httpOptions.headers
          })
          .pipe(map(res => res));
      }
  
  
        //method to delete a student
        deleteStudent(data: any) {
  
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // Authorization: this.token
        })
      };
  
      return this.http
        .post(this.server_url + 'student_interns/deleteStudent', { id: data }, {
          headers: httpOptions.headers
        })
        .pipe(map(res => res));
    }
  
  
  
}
