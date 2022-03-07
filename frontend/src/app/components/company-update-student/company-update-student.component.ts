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
  selector: 'app-company-update-student',
  templateUrl: './company-update-student.component.html',
  styleUrls: ['./company-update-student.component.scss']
})
export class CompanyUpdateStudentComponent implements OnInit {

  studentForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    idNo_or_passportNo: new FormControl('', [Validators.required]),
    student_number: new FormControl('', [Validators.required, Validators.minLength(7), Validators.pattern('[- +()0-9]+')]),
    student_email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9A-Z._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    student_phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.minLength(8)]),
    institution: new FormControl('', [Validators.required]),
    field_of_study: new FormControl('', [Validators.required]),
    internships_name: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    company_email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9A-Z._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    company_registrationNo: new FormControl('', [Validators.required]),
    admission: new FormControl('',[Validators.required]),
    completion: new FormControl('',[Validators.required]),
    student_document: new FormControl('', [Validators.required]),
    town_city: new FormControl('', [Validators.required]),

    // contact_details: new FormControl('', [Validators.required]),
  },
  );
  data: any;
  loading: Boolean = false;
    public submitted = false;
  image!: File;
  // completion: string = "not updated";
  // admission: string = "not updated";
  // selectedImage?: pdfSnippet;
  // fileMessage: string = "No pdf document uploaded";
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
  showtoast: Boolean = false;
  showUError: any;
  showPwd = false;
  closeAlert = false;
  // errorMessage: any;
  waiting: boolean = false;


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
        } else if (this.data.editStudent) {
          //creating the form and making the values not required
         console.log('primary key', this.data.students_interns.id);
    
          this.studentForm.patchValue({
            institution: this.data.students_interns.institution,
            internships_name: this.data.students_interns.internships_name,
            company: this.data.students_interns.company,
            company_email: this.data.students_interns.company_email,
            company_registrationNo: this.data.students_interns.company_registrationNo,
            town_city: this.data.students_interns.town_city,
            firstname: this.data.students_interns.firstname,
            surname: this.data.students_interns.surname,
            idNo_or_passportNo: this.data.students_interns.idNo_or_passportNo,
            student_number: this.data.students_interns.student_number,
            student_email: this.data.students_interns.student_email,
            student_phoneNumber: this.data.students_interns.student_phoneNumber,
            field_of_study: this.data.students_interns.field_of_study,
            completion: this.data.students_interns.completion,
            student_document: this.data.students_interns.student_document,

            // admission: this.data.data.admission,

          });
          //getting the h1 element
         //  this.document.getElementById('header').innerText = `Edit ${this.data.data.username}'s information`;
    
    
    
        } 
  }

  

  get f() { return this.studentForm?.controls }

  // selectImage(event:any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.image = file;
  //     this.fileMessage = file.name;
  //     this.missingImage = false;
  //     this.sizeLimit = false;
  //     this.wrongType = false;
  //     const reader = new FileReader();
  //     reader.addEventListener('load', (event: any) => {
  //       this.selectedImage = new pdfSnippet(event.target.result, file);
  //     });
  //     reader.readAsDataURL(file);
  //   }
  // }

  async onSubmit(event: Event) {

    event.preventDefault();
    this.submitted = true;
    this.resetErrors();


    if (this.studentForm.invalid) {

      return;

    }

    // if (this.missingImage || this.wrongType || this.sizeLimit) {
    //   return;
    // }

    if (this.studentForm.valid) {
    const data = JSON.parse(localStorage.getItem('userdata')!);
    this.loading = true;
    this.btnWait = true;

    const student_details = {
      firstname: this.studentForm.value.firstname,
      surname: this.studentForm.value.surname,
      idNo_or_passportNo: this.studentForm.value.idNo_or_passportNo,
      student_number: this.studentForm.value.student_number,
      student_email: this.studentForm.value.student_email,
      student_phoneNumber: this.studentForm.value.student_phoneNumber,
      institution: this.studentForm.value.institution,
      field_of_study: this.studentForm.value.field_of_study,
      internships_name: this.studentForm.value.internships_name,
      company: this.studentForm.value.company,
      town_city: this.studentForm.value.town_city,

      company_email: this.studentForm.value.company_email,
      company_registrationNo: this.studentForm.value.company_registrationNo,
      completion: this.studentForm.value.completion,
      admission: this.studentForm.value.admission,
      student_document: this.studentForm.value.student_document
       
    };

    //create new post
    this.studentService.updateStudentDetails(this.data.students_interns.id, student_details).subscribe((data: any) => {

      if(data.success){

        this.showtoast = true;

        //  email data
        const userdata = {
          email: `internshipprogramme@mtc.com.na`,
          message: ` ${this.studentForm.value.company}  
          This student: ${this.studentForm.value.firstname} ${this.studentForm.value.surname}, 
          student number: ${this.studentForm.value.student_number},
          Institution: ${this.studentForm.value.institution},
          Is ${this.studentForm.value.admission}, for ${this.studentForm.value.internship_name} at ${this.studentForm.value.company}`,
        };

             // sending email to the user
          this.internshipsService.sendEmailPlain(userdata).subscribe();
    


      }

     else{

      if (data.message === 'Error while sending details' || !data.success) {
        this.showUError = 'something went wrong try again later';
        this.loading = true;


        console.log('eerror', this.showUError);
        setTimeout(() => {
          this.showUError = null;
          // this.router.navigate(['/login']);
        }, 10000);
        // this.waiting = false;

        this.ngOnInit()
        setTimeout(() => {
          this.waiting = false;
          console.log("Doneeee");
          this.router.navigate(['/companystudentlist']);

        }, 3000);
      } 

        
     }

    })
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
    this.router.navigate(['/companystudentlist']);
  }, 3000);
}
}
