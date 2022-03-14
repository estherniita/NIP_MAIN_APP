import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { InternshipsService } from '../../services/internships.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

class pdfSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-company-internship-post',
  templateUrl: './company-internship-post.component.html',
  styleUrls: ['./company-internship-post.component.scss']
})
export class CompanyInternshipPostComponent implements OnInit {

  createForm = new FormGroup({
    company_name: new FormControl('', [Validators.required]),
    town_city: new FormControl('', [Validators.required]),
    registration_number: new FormControl('', [Validators.required]),
    internship_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    number_of_positions: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
    email: new FormControl('', [Validators.email, Validators.required]),
    closing_date: new FormControl('', [Validators.required]),
    pdf_file: new FormControl('', [Validators.required]),
    // contact_details: new FormControl('', [Validators.required]),
  },
  );

  image!: File;
  selectedImage?: pdfSnippet;
  fileMessage: string = "No pdf document uploaded";
  submitted: Boolean = false;
  loading: Boolean = false;
  btnWait: Boolean = false;
  showSnackbar:Boolean = false;
  message?: String;
  error:Boolean = false;
  maxUpload: Boolean = false;
  missingImage: Boolean = true;
  wrongType: Boolean = false;
  sizeLimit: Boolean = false;
  otherErr: Boolean = false;
  errorMessage: Subject<string> = new Subject();
  data: any;
  public companyData: any;
  showtoast: boolean = false;

  showUError: any;
  showPwd = false;
  closeAlert = false;

  currentDate?: string;


  // errorMessage: Subject<string> = new Subject();
  waiting: Boolean = false;


  constructor(private router: Router, private internshipsService: InternshipsService, private recaptchaV3Service: ReCaptchaV3Service) { }

  ngOnInit(): void {


    
    //getting the current year to show on the copyright
    this.currentDate = new Date().toISOString().slice(0, 10);

    console.log('date', this.currentDate)
    
    this.companyData = JSON.parse(localStorage.getItem('userdata') || '{}');

  //  console.log('userdata', this.companyData);


    document.title = "Company: Post New Internship"

    if (this.companyData === undefined ||  this.companyData === null) {
      this.router.navigate(['/companies'])
    } else if (this.companyData.isLoggedin) {

   console.log('company', this.companyData.email);

    this.createForm.patchValue({
      registration_number: this.companyData.registration_number,
      company_name: this.companyData.organization_name,
      email: this.companyData.email
    });

  }
  }

  

  get f() { return this.createForm?.controls }

  selectImage(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      this.fileMessage = file.name;
      this.missingImage = false;
      this.sizeLimit = false;
      this.wrongType = false;
      const reader = new FileReader();
      reader.addEventListener('load', (event: any) => {
        this.selectedImage = new pdfSnippet(event.target.result, file);
      });
      reader.readAsDataURL(file);
    }
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    this.submitted = true;
    this.resetErrors();

    if (this.createForm.invalid) {
      return;
    }

    if (this.missingImage || this.wrongType || this.sizeLimit) {
      return;
    }

    if (this.createForm.valid) {

      this.recaptchaV3Service.execute('importantAction')
    .subscribe((token: string) => {
      console.debug(`Token [${token}] generated`);
    });
    
    const data = JSON.parse(localStorage.getItem('userdata')!);
    this.loading = true;
    this.btnWait = true;

  

    //create new post
    this.internshipsService.companyInternsipPost(
      this.f.company_name.value,
      this.f.town_city.value,
      this.f.internship_name.value,
      this.f.registration_number.value,
      this.f.number_of_positions.value,
      this.f.email.value,
      this.f.closing_date.value,
      this.image
    ).then(async (data: any) => {
      if(data.success) {

        this.showtoast = true;
        
        //  email data
        const userdata = {
          email_from: `${this.createForm.value.email}`,
          email: 'internshipprogramme@mtc.com.na',
          email_subject: 'New Available Internship Request(s)',
          message: `${this.createForm.value.company_name} posted new post for: ${this.createForm.value.internship_name}, 
          ${this.createForm.value.number_of_positions} position.
         in ${this.createForm.value.town_city}.
         Please log on to the NIP admin dashboard to send the request to specific institutions. `,
        };

             // sending email to the user
          this.internshipsService.sendEmailPlain(userdata).subscribe();
    

        // this.ngOnInit()

      }  

      else {
        if (data.message === 'Error while inserting') {
          this.showUError = 'An error occurred while sending request, please try again latter';
          setTimeout(() => {
            this.showUError = null;
            // this.router.navigate(['/login']);
          }, 10000);
          this.waiting = false;
  
          setTimeout(() => {
            this.closeAlert = true;
          }, 10000);
        }
      }

    }).finally(() => {
      this.onComplete();
    });
    }
  }

  // Reset all client-side error indicators
  resetErrors() {
    this.maxUpload = false;
    this.wrongType = false;
    this.sizeLimit = false;
    this.otherErr = false;
  }

  // Display errors based on type
  handleError(err:any) {
    if (!err) return;

    switch(err.error) {
      case 1001:
        this.missingImage = true;
        break;
      case 1002:
        this.wrongType = true;
        break;
      case 1003:
        this.otherErr = true;
        break;
      default:
        this.sizeLimit = true;
        break;
    }
  }


  // After handling profile upload response
onComplete() {
  this.loading = false;

  setTimeout(() => {
    this.btnWait = false;
    this.router.navigate(['/companies']);
  }, 3000);
}
}