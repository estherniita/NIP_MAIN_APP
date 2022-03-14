import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Users } from '../Users';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})



export class UsersService {

  private server_url = environment.serverUrl;
  authToken: any;
  private token = environment.token;
  user?: Object;
  username?: String;
  userdata: any;
  private currentUserSubject?: BehaviorSubject<Users>;
  public currentUser?: Observable<Users>;
  private userMessage = new BehaviorSubject({});
  
  sharedMessage = this.userMessage.asObservable();

  constructor(private http: HttpClient) { }


  nextUserMessage(message: string) {
    this.userMessage.next(message)
  }

  registerUser(user:any): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       Authorization: this.token
      })
    };

    return this.http
      .post( this.server_url + 'user/register', user, {
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
      .post(this.server_url + 'user/authenticate', user, {
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

      }
      else { return false; }
 
  }

  public isUserAuthenticatedOrganization(): boolean {
    const user = JSON.parse(localStorage.getItem('userdata')!);
    if (user && user.role == 'organization') {
    
      return (user.token, user.role);

      }else { return false; }
 
  }


  
  public isUserAuthenticatedInstitutions(): boolean {
    const user = JSON.parse(localStorage.getItem('userdata')!);
    if ((user) && user.role == 'adminIUM' || user.role == 'adminNUST' || user.role == 'adminNIMT'
     || user.role == 'adminUNAM' || user.role == 'adminVTC' || user.role == 'adminCompany' || user.role == 'organization') {
    
      return (user.token, user.role);

      }else { return false; }
 
  }



  getUserByUsername(username: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       Authorization: this.token
      })
    };

    return this.http
      .post(this.server_url + "user/byusername", username, {
        headers: httpOptions.headers
      })
      .pipe(map(res => res));
  }



  getAllUsers() {
    const httpOptions1 = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
       Authorization: this.token
      })
    };

    return this.http
      .get(this.server_url + "user/getAllUsers", {
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

    //method to delete a facilitator
    updateUser(id: any, data: any) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.token

      
        })
      };
  
      return this.http
        .put(this.server_url + `user/updateUser/${id}`, data, {
          headers: httpOptions.headers
        })
        .pipe(map(res => res));
    }


      //method to delete a facilitator
  deleteUser(data: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       Authorization: this.token
      })
    };

    return this.http
      .post(this.server_url + `user/deleteUser`, { id: data }, {
        headers: httpOptions.headers
      })
      .pipe(map(res => res));
  }



  getEmail(email: any): any {
    const data = {
      email
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       Authorization: this.token
      })
    };

    return this.http
      .post(this.server_url + `user/emailCheck`, data, {
        headers: httpOptions.headers
      })
       

      .pipe(map(res => res));
  }


  public isUserOrAdminAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('userdata')!);
    if (user) {
      return user.token && user.role;
    } else { return false; }
  }

  sendToken(token: any) {
    return this.http.post<any>(this.server_url + 'token_validate', { recaptcha: token });
  }

  
}



