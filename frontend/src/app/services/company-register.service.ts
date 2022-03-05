import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Users } from '../Users';
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
export class CompanyRegisterService {

  organization?: Object;
  registration_number?: String;
  organizationdata: any;
  private userMessage = new BehaviorSubject({});
  private server_url = environment.serverUrl;

  constructor(private http: HttpClient,  private auth: UsersService,
    private router: Router) { }


    
  nextUserMessage(message: string) {
    this.userMessage.next(message)
  }

  //method to register new organization
    registerOrganization(organization: any): any {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // Authorization: this.token
        })
      };
  
      return this.http
        .post(this.server_url + 'organization_register/registerOrganizations', organization, {
          headers: httpOptions.headers
        })
        .pipe(map(res => res));
    }


    getOrganizationByRegistrationNo(registration_number: any) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // Authorization: this.token
        })
      };
  
      return this.http
        .post(this.server_url + "organization_register/getOrganizationByRegistrationNo", registration_number, {
          headers: httpOptions.headers
        })
        .pipe(map(res => res));
    }
  
  
  
    getAllRegisteredOrganization() {
      const httpOptions1 = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          // Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url + "organization_register/getAllRegisteredOrganization", {
          headers: httpOptions1.headers
        })
        .pipe(map(res => res));
      //  .toPromise()
      //  .then(data => {
      //    return data;
      //  }).catch(e => {
      //    console.log(e);
      // });
    }
  
      //method to update organization details
      updateOrganizationDetails(id: any, data: any) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
        
          })
        };
    
        return this.http
          .put(this.server_url + `organization_register/updateOrganizationDetails/${id}`, data, {
            headers: httpOptions.headers
          })
          .pipe(map(res => res));
      }
  
  
        //method to delete an organization
     deleteOrganization(data: any) {
  
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // Authorization: this.token
        })
      };
  
      return this.http
        .post(this.server_url + `organization_register/deleteOrganization`, { id: data }, {
          headers: httpOptions.headers
        })
        .pipe(map(res => res));
    }
  
  
  
    //method to get an email
    getEmail(email: any): any {
      const data = {
        email
      };
  
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // Authorization: this.token
        })
      };
  
      return this.http
        .post(this.server_url + `organization_register/emailCheck`, data, {
          headers: httpOptions.headers
        })
  
        .pipe(map(res => res));
    }
  
}
