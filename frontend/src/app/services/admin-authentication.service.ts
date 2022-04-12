import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
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

export class AdminAuthenticationService {

  authToken: any;
  private token = environment.token;
  user?: Object;
  username?: String;
  userdata: any;
  private currentUserSubject?: BehaviorSubject<Users>;
  public currentUser?: Observable<Users>;
  private server_url = environment.serverUrl;

  constructor(private http: HttpClient,  private auth: UsersService,
    private router: Router,) { }

   
  public isUserAuthenticatedCompany(): boolean {
    const user = JSON.parse(localStorage.getItem('userdata')!);
    if (user && user.role == 'adminCompany' || user && user.role == 'organization') {
    
      return (user.token, user.role);

      }else { return false; }
 
  }


  canActivate(): boolean {
    if (!this.auth.isUserOrAdminAuthenticated()) {
      this.router.navigate(["/?"]);
      // setTimeout(() => {
      //   this.modal.open(LoginComponent, {});
      // }, 2000);
      return false;
    }
    return true;
  }




  public isUserAuthenticatedIUM(): boolean {
    const user = JSON.parse(localStorage.getItem('userdata')!);
    if (user && user.role == 'adminIUM') {
    
      return (user.token, user.role);

      }else { return false; }
 
  }


  public isUserAuthenticatedNUST(): boolean {
    const user = JSON.parse(localStorage.getItem('userdata')!);
    if (user && user.role == 'adminNUST') {
    
      return (user.token, user.role);

      }else { return false; }
 
  }

  
  public isUserAuthenticatedNIMT(): boolean {
    const user = JSON.parse(localStorage.getItem('userdata')!);
    if (user && user.role == 'adminNIMT') {
    
      return (user.token, user.role);

      }else { return false; }
 
  }


    
  public isUserAuthenticatedUNAM(): boolean {
    const user = JSON.parse(localStorage.getItem('userdata')!);
    if (user && user.role == 'adminUNAM') {
    
      return (user.token, user.role);

      }else { return false; }
 
  }


  public isUserAuthenticatedVTC(): boolean {
    const user = JSON.parse(localStorage.getItem('userdata')!);
    if (user && user.role == 'adminVTC') {
    
      return (user.token, user.role);

      }else { return false; }
 
  }
 
  registerAdmin(user: any): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       Authorization: this.token
      })
    };

    return this.http
      .post(this.server_url + 'admin/register', user, {
        headers: httpOptions.headers
      })
      .pipe(map(res => res));
  }

  

  login(user: any): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       Authorization: this.token
      })
    };
  
    return this.http
      .post(this.server_url + 'admin/authenticate', user, {
        headers: httpOptions.headers
      })
      .pipe(map(res => res));
  }


  public isUserAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('userdata')!);
    if (user) {
      return user.token;
    } else { return false; }
  }


  public isUserAuthenticatedrole(): boolean {
    const user = JSON.parse(localStorage.getItem('userdata')!);
    if (user && user.role == 'admin') {
    
      return (user.token, user.role);

      }else { return false; }
 
  }



  getAdminByUsername(username: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       Authorization: this.token
      })
    };

    return this.http
      .post(this.server_url + "admin/byusername", username, {
        headers: httpOptions.headers
      })
      .pipe(map(res => res));
  }



  getAllAdmins() {
    const httpOptions1 = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      Authorization: this.token
      })
    };

    return this.http
      .get(this.server_url + "admin/getAllAdmins", {
        headers: httpOptions1.headers
      })
      .pipe(map(res => res));
  
  }


  getAllRegisteredOrganization() {
    const httpOptions1 = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      Authorization: this.token
      })
    };

    return this.http
      .get(this.server_url + "organization_register/getAllRegisteredOrganization", 
      {
        headers: httpOptions1.headers
      })
      .pipe(map(res => res));
  
  }

    //method to delete a facilitator
    updateAdmin(id: any, data: any) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
      
        })
      };
  
      return this.http
        .put(this.server_url + `admin/updateAdmin/${id}`, data)
        .pipe(map(res => res));
    }


      //method to delete an admin
  deleteAdmin(data: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       Authorization: this.token
      })
    };

    return this.http
      .post(this.server_url + `admin/deleteAdmin`, { id: data }, {
        headers: httpOptions.headers
      })
      .pipe(map(res => res));
  }


        //method to delete an organization admin
        deleteOrganization(data: any) {

          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
             Authorization: this.token
            })
          };
      
          return this.http
            .post(this.server_url + `organization_register/deleteOrganization`, { id: data }, {
              headers: httpOptions.headers
            })
            .pipe(map(res => res));
        }

}
