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
export class InternshipsService {

  authToken: any;
  private token = environment.token;
  internships?: Object;
  public surname: any;
  internshipdata: any;
  applicationData?: Object;
  private server_url = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getAllavailableInternships(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       Authorization: this.token
      })
    };

    return this.http
      .get(this.server_url + 'availableInternships/getAllavailableInternships', {
        headers: httpOptions.headers
      })
      .pipe(map(res => res));
  }


  getAllavailableInternships1(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       Authorization: this.token
      })
    };

    return this.http
      .get(this.server_url + 'availableInternships/getAllavailableInternships1', {
        headers: httpOptions.headers
      })
      .pipe(map(res => res));
  }


  getAllInternshipNames(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       Authorization: this.token
      })
    };

    return this.http
      .get(this.server_url + 'availableInternships/getAllInternshipName', {
        headers: httpOptions.headers
      })
      .pipe(map(res => res));
  }
  
  
  sendNewInternships(internships: any): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       Authorization: this.token
      })
    };

    return this.http
      .post('https://api.mtc.com.na/nip/2.0.0/' + 'new-internships/sendNewInternships', internships, {
        headers: httpOptions.headers
      })
      .pipe(map(res => res));
  }



    // method to usend plain emails, with no attachment
    sendEmailPlain(userdata: any) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
         Authorization: this.token
        })
      };
  
      return this.http
        .post(this.server_url + 'smtp/sendemailplain', userdata, {
          headers: httpOptions.headers
        })
        .pipe(map(res => res));
    }




    companyInternsipPost(company_name: string, town_city: string, internship_name: string, registration_number: string, number_of_positions: string, email: string, closing_date: string, pdf_file: any): any {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.token
        })
      };

      const formData = new FormData();
      formData.append('company_name', company_name);
      formData.append('town_city', town_city);
      formData.append('internship_name', internship_name);
      formData.append('registration_number', registration_number);
      formData.append('number_of_positions', number_of_positions);
      formData.append('email', email);
      formData.append('closing_date', closing_date);
      formData.append('pdf_file', pdf_file);
  
      return this.http
        .post(this.server_url + 'availableInternships/availableInternship', formData, {headers: httpOptions.headers})
        .toPromise();
    }

    
    IUMreceived(): any {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
         Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url  + 'new-internships/getIUMInternship', {
          headers: httpOptions.headers
        })
        .pipe(map(res => res));
    }

    

    NUSTreceived(): any {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
         Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url + 'new-internships/getNUSTInternship', {
          headers: httpOptions.headers
        })
        .pipe(map(res => res));
    }


    NIMTreceived(): any {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
         Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url + 'new-internships/getNIMTInternship', {
          headers: httpOptions.headers
        })
        .pipe(map(res => res));
    }


    UNAMreceived(): any {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
         Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url + 'new-internships/getUNAMInternship', {
          headers: httpOptions.headers
        })
        .pipe(map(res => res));
    }


    VTCreceived(): any {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
         Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url + 'new-internships/getVTCInternship', {
          headers: httpOptions.headers
        })
        .pipe(map(res => res));
    }

    

    getAllSendInternship(): any {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
         Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url + 'new-internships/getAllSendInternship', {
          headers: httpOptions.headers
        })
        .pipe(map(res => res));
    }


      //method to download pdf files
      download(pdf_file: any): any {
        const data = {
          pdf_file
        };
    
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
           Authorization: this.token
          })
        };
    
        return this.http
          .post(this.server_url + `availableInternships/download`, data, {responseType: 'blob',
            headers: httpOptions.headers
          })
    
          .pipe(map(res => res));
      }
    
}



