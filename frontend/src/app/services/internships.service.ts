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
      .post(this.server_url + 'new-internships/sendNewInternships', internships, {
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
        } )
        .pipe(map(res => res));
    }




    companyInternsipPost(company_name: string, town_city: string, internship_name: string, registration_number: string, number_of_positions: string, email: string, closing_date: string, pdf_file: any): any {
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     // 'Content-Type': 'application/json'
      //     // Authorization: this.token
      //   })
      // };

      const headers = new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik5UZG1aak00WkRrM05qWTBZemM1TW1abU9EZ3dNVEUzTVdZd05ERTVNV1JsWkRnNE56YzRaQT09In0.eyJhdWQiOiJodHRwOlwvXC9vcmcud3NvMi5hcGltZ3RcL2dhdGV3YXkiLCJzdWIiOiJhZG1pbkBjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6ImFkbWluIiwidGllclF1b3RhVHlwZSI6InJlcXVlc3RDb3VudCIsInRpZXIiOiJVbmxpbWl0ZWQiLCJuYW1lIjoibmlwLWFwcCIsImlkIjo5OCwidXVpZCI6bnVsbH0sInNjb3BlIjoiYW1fYXBwbGljYXRpb25fc2NvcGUgZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9tdGNwcmRhcGlndzEubXRjZGMuY29tLm5hOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyJVbmxpbWl0ZWQiOnsidGllclF1b3RhVHlwZSI6InJlcXVlc3RDb3VudCIsInN0b3BPblF1b3RhUmVhY2giOnRydWUsInNwaWtlQXJyZXN0TGltaXQiOjAsInNwaWtlQXJyZXN0VW5pdCI6bnVsbH19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6Im5pcCIsImNvbnRleHQiOiJcL25pcFwvMS4wLjAiLCJwdWJsaXNoZXIiOiJhZG1pbiIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJVbmxpbWl0ZWQifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoibmlwIiwiY29udGV4dCI6IlwvbmlwXC8yLjAuMCIsInB1Ymxpc2hlciI6ImFkbWluIiwidmVyc2lvbiI6IjIuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IlVubGltaXRlZCJ9XSwiY29uc3VtZXJLZXkiOiJQVFdZZ3JVd0s4NmRITHdTWTBoVDlDU1dXaDBhIiwiZXhwIjozNzk0Njc2NzMwLCJpYXQiOjE2NDcxOTMwODMsImp0aSI6ImE1NGUzYWU4LWI4NDctNGViMi1iZDNhLTM5NTM5MDQ3ZmM2ZCJ9.bPtdpa-mN6xgqvXwlvk4vPefS-6rs-lsFmYM9w5Bg64gk3tDZp3q4uE17ZDO-ooBzZo9sOUYMyQHxgdvl2wzXMecuDBE35jIzn77TLnpU3gQDEmZKvcNS-68luFfo-mLhU3C92zqC28PPYT6Y9qGS9Srh2efPXGWGVsgaJU3wLd-HslV047-KaHUB8rfJEHHSY5tDrkkKWy0GzyeKK99Z5zFBq908tm_yxEbjAab1Q_zmHy6x75nJTzhKNZTGXkz-b7YOkEX91GJvsNTv4ajP6TJzIsGYHqXWLAcnwU246amU43PaQIsXjezcb4XSOat2e2B3gjNryy2flx18Ph6Gg')

      

      const formData = new FormData();
      formData.append('company_name', company_name);
      formData.append('town_city', town_city);
      formData.append('internship_name', internship_name);
      formData.append('registration_number', registration_number);
      formData.append('number_of_positions', number_of_positions);
      formData.append('email', email);
      formData.append('closing_date', closing_date);
      formData.append('pdf_file', pdf_file);
      // console.log('headers', {headers: httpOptions.headers})
      return this.http
        .post(this.server_url + 'availableInternships/availableInternship', formData, {headers})
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



    getTotalRequestSentToInstitution(): any {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
         Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url + 'new-internships/getTotalRequestSentToInstitution', {
          headers: httpOptions.headers
        })
        .pipe(map(res => res));
    }
    

    getTotalAvailableInternships(): any {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
         Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url + 'availableInternships/getTotalAvailableInternships', {
          headers: httpOptions.headers
        })
        .pipe(map(res => res));
    }


    

    

    getTotalAvailableInternshipPost(): any {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
         Authorization: this.token
        })
      };
  
      return this.http
        .get(this.server_url + 'availableInternships/getTotalAvailableInternshipPost', {
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



