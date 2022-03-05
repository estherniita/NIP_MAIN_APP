import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { InternshipsService } from '../../services/internships.service';
import {StudentInternsService} from '../../services/student-interns.service';
import {AdminAuthenticationService} from '../../services/admin-authentication.service';

class pdfSnippet {
  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  studentForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    idNo_or_passportNo: new FormControl('', [Validators.required]),
    student_number: new FormControl('', [Validators.required, Validators.minLength(2)]),
    student_email: new FormControl('', [Validators.required, Validators.email]),
    student_phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
    institution: new FormControl('', [Validators.required]),
    field_of_study: new FormControl('', [Validators.required]),
    internships_name: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    company_email: new FormControl('', [Validators.required, Validators.email]),
    company_registrationNo: new FormControl('', [Validators.required]),
    admission: new FormControl('',),
    completion: new FormControl('',),
    student_document: new FormControl('', [Validators.required]),
    // contact_details: new FormControl('', [Validators.required]),
  },
  );
  public data: any;
  loading: Boolean = false;
    public submitted = false;
  image!: File;
  completion: string = "No";
  admission: string = "No";
  selectedImage?: pdfSnippet;
  fileMessage: string = "No pdf document uploaded";
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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    // private usersService: UsersService,
    public adminAuthenticationService: AdminAuthenticationService,
    public studentService: StudentInternsService,
    private internshipsService: InternshipsService,

  
    
  ) { }

  ngOnInit(): void {

        //gettign the data from the localstroage
        this.data = JSON.parse(localStorage.getItem('INTERNSHIPdata') || '{}')

        if (this.data === undefined ||  this.data === null) {
          this.router.navigate(['/institutionReceivedInternships'])
        } else if (this.data.sendStudent) {
          //creating the form and making the values not required
          
    
          this.studentForm.patchValue({
            institution: this.data.data.institution,
            internships_name: this.data.data.internships_name,
            company: this.data.data.company,
            company_email: this.data.data.email,
            company_registrationNo: this.data.data.registration_number
          });
          //getting the h1 element
         //  this.document.getElementById('header').innerText = `Edit ${this.data.data.username}'s information`;
    
    
    
        } 
  }

  

  get f() { return this.studentForm?.controls }

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

    if (this.studentForm.invalid) {
      return;
    }

    if (this.missingImage || this.wrongType || this.sizeLimit) {
      return;
    }

    if (this.studentForm.valid) {
    const data = JSON.parse(localStorage.getItem('userdata')!);
    this.loading = true;
    this.btnWait = true;


    //create new post
    this.studentService.newStudentInterns(
      this.f.firstname.value,
      this.f.surname.value,
      this.f.idNo_or_passportNo.value,
      this.f.student_number.value,
      this.f.student_email.value,
      this.f.student_phoneNumber.value,
      this.f.institution.value,
      this.f.field_of_study.value,
      this.f.internships_name.value,
      this.f.company.value,
      this.f.company_email.value,
      this.f.company_registrationNo.value,
      this.completion,
      this.admission,
      this.image
    ).then(async (data: any) => {
      if(data.success) {
        
        //  email data
        const userdata = {
          email: this.studentForm.value.company_email,
          message: ` ${this.studentForm.value.company}  
          ${this.studentForm.value.company}
          Find the student qualified from ${this.studentForm.value.institution} for the internship request:
           ${this.studentForm.value.internships_name} from your company.`,
        };

             // sending email to the user
          this.internshipsService.sendEmailPlain(userdata).subscribe();
    

        // this.ngOnInit()

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
    this.router.navigate(['/institutionReceivedInternships']);
  }, 3000);
}
}