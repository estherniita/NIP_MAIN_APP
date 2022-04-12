import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  NgbActiveModal,
  NgbModalConfig
} from "@ng-bootstrap/ng-bootstrap";
import {StudentInternsService} from '../../services/student-interns.service';
import { DOCUMENT } from '@angular/common';
import { saveAs } from 'file-saver';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { InternshipsService } from '../../services/internships.service';
import $ from 'jquery';


class pdfSnippet {
  constructor(public src: string, public file: File) {}
}



@Component({
  selector: 'app-company-admitted-completted-student',
  templateUrl: './company-admitted-completted-student.component.html',
  styleUrls: ['./company-admitted-completted-student.component.scss']
})
export class CompanyAdmittedComplettedStudentComponent implements OnInit {

  updateModal() {
    ($("#updateModal")as any).modal('toggle');
  }

  public popoverTitle: string = 'Update completed students';
  public popoverMessage: string = 'Update completed student?';
   public confirmClicked: boolean = false;
   public cancelClicked: boolean = false;
 
  studentForm = new FormGroup({
    comments: new FormControl('',),
    completion: new FormControl('', [Validators.required]),
    student_completion_report: new FormControl('', [Validators.required]),
   
  },
  );


  public Internships = [];
  id?: string;
  student: any;
  username: any;
  search: any;
  students_interns: any;
  students: string[] = [];
  completed_students: string[] = [];

  showAlert?: boolean;
  title?: string;
  public companyData: any;


  //for the student form
  data: any;
  loading: Boolean = false;
    public submitted = false;
  image!: File;
  selectedImage?: pdfSnippet;
  fileMessage: string = "No pdf document uploaded";
  btnWait: Boolean = false;
  showSnackbar:Boolean = false;
  message?: String;
  error:Boolean = false;
  maxUpload: Boolean = false;
  showtoast2: Boolean = false;
  missingImage: Boolean = true;
  wrongType: Boolean = false;
  sizeLimit: Boolean = false;
  otherErr: Boolean = false;
  errorMessage: Subject<string> = new Subject();
  showtoast: Boolean = false;
  showUError: any;
  showPwd = false;
  closeAlert = false;

  

  constructor(public studentService: StudentInternsService,  
    private internshipsService: InternshipsService,

    private activeModal: NgbActiveModal, private router: Router, private formBuilder: FormBuilder,

    ) { }

  ngOnInit(): void {

        //gettign the data from the localstroage
        this.data = JSON.parse(localStorage.getItem('INTERNSHIPdata') || '{}')

    this.allAdmittedInternStudents();
    this.getAllCompletedInternsPerOrgan();
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

    console.log('here now');

    if (this.studentForm.invalid) {
      return;
    }

    if (this.missingImage || this.wrongType || this.sizeLimit) {
      return;
    }

    if (this.studentForm.valid) {
    const data = JSON.parse(localStorage.getItem('INTERNSHIPdata')!);
    this.loading = true;
    this.btnWait = true;

    console.log('valid');

    //create new post
    this.studentService.updateStudentCompleted(

      this.data.students_interns.id, 
      this.f.completion.value,
      this.f.comments.value,
      this.image,
 

    ).then(async (data: any) => {

      console.log('valid', this.image);


      if(data.success){

        

        this.showtoast = true;

        console.log('submitted');
        //  email data
        const userdata = {
          email: `${this.data.students_interns.student_email}`,
          email_from: 'internshipprogramme@mtc.com.na',
          email_subject: 'Student Internship Completion',
          message: ` 
         The Internship is completed`,
        };

             // sending email to the user
          if (this.internshipsService.sendEmailPlain(userdata).subscribe()) {
            console.log('succecc');
          }else{
            console.log('fail');
          }
    
        // this.ngOnInit()

      }

   

    }) .finally(() => {
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
    this.router.navigate(['/admittedCompletedStudentInterns']);
  }, 3000);
}



  editRecord(students_interns: any) {


    const datatosave = {
      editStudent: true,
      students_interns
    }

    //saving data in the local storage
    localStorage.setItem('INTERNSHIPdata', JSON.stringify(datatosave));
  }

  


  //Method
  allAdmittedInternStudents(){

    this.companyData = JSON.parse(localStorage.getItem('userdata') || '{}');

    console.log('registration number', this.companyData.registration_number);

    this.studentService.getAllAdmittedInternsPerOrganization(this.companyData.registration_number)
    .subscribe((data:any) => {
      if ( data.match && data.success ) {
      // this.Users.push(result);
    

    
    
        // document.title = "Company: Post New Internship"
    
       
          data.students_interns.forEach((val: any) =>
          
          this.students.push(val));

      //  console.log('company', this.companyData.email);
     }  

     else {


     }


    });
  }


  //method to get
  
  getAllCompletedInternsPerOrgan(){

    this.companyData = JSON.parse(localStorage.getItem('userdata') || '{}');

    console.log('registration number', this.companyData.registration_number);

    this.studentService.getAllCompletedInternsPerOrgan(this.companyData.registration_number)
    .subscribe((data:any) => {
      if ( data.match && data.success ) {
      // this.Users.push(result);
    

       console.log('result', data);
    
    
        // document.title = "Company: Post New Internship"
    
       
          data.students_interns.forEach((val: any) =>
          
          this.completed_students.push(val));

      //  console.log('company', this.companyData.email);
     }  

     else {


     }


    });
  }

  

   //download method
   download(student_document: any){

    


    this.studentService.download(student_document).subscribe((data: any) => {

        saveAs(data, `Student Documents ${new Date().toLocaleDateString('en-GB')}.pdf`)
       

    });

  }
  
}
