import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { InternshipsService } from '../../services/internships.service';
import {UsersService} from '../../services/users.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-send-internships-to-institutions',
  templateUrl: './send-internships-to-institutions.component.html',
  styleUrls: ['./send-internships-to-institutions.component.scss']
})
export class SendInternshipsToInstitutionsComponent implements OnInit {


  new_internshipsForm = new FormGroup({
    internships_name: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    town_city: new FormControl('', [Validators.required]),
    registration_number: new FormControl('', [Validators.required]),
    closing_date: new FormControl('', [Validators.required]),
    company_email: new FormControl('', [Validators.required, Validators.email]),
    no_of_internship: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
    institution: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pdf_file: new FormControl('', [Validators.required]),
  
        }

      );


  institution_list = [
    { INSTITUIONNAME: 'International University of Management (IUM)', EMAILAD: 'c.upora@ium.edu.na' },
    { INSTITUIONNAME: 'Namibia University of Science and Technology (NUST)', EMAILAD: 'kkapelwa@nust.na' },
    { INSTITUIONNAME: 'Namibia Institute of Mining and Technology (NIMT)', EMAILAD: 'Ismael.Groenewald@nimt.edu.na' },
    { INSTITUIONNAME: 'University of Namibia (UNAM)', EMAILAD: 'knghipandulwa@unam.na' },
    { INSTITUIONNAME: 'Vocational Training Centre (VTC) through the Namibia Training Authority (NTA)', EMAILAD: 'dmwiya@nta.com.na' },

  ]

  public allpositions = [];
  public Users = [];
  user: any;

  username: any;
  search: any;
  data: any;
  Internships = [];
  InternshipsName = [];
  number: any;

  submitted = false;
  
  btnWait: Boolean = false;

  loading: Boolean = false;
  isSuccessful = false;
  valid = false;
  
  emailaddress: any;
  email: any;
  no_of_internship: any;
  public iname: any;
  public  intern: any;
  showtoast: Boolean = false;

 
  availableinternships: any;
  availableInternship: any;

  constructor(private internshipsService: InternshipsService, @Inject(DOCUMENT) private document: Document,
  public userService: UsersService, private formBuilder: FormBuilder, private route: ActivatedRoute,  private router: Router) { }

  ngOnInit(): void {

     //gettign the data from the localstroage
     this.data = JSON.parse(localStorage.getItem('INTERNSHIPdata')!)

     if (this.data === undefined ||  this.data === null) {
       this.router.navigate(['/availableInternship'])
     } else if (this.data.sendInternship) {
 
 
       this.new_internshipsForm.patchValue({
         internships_name: this.data.data.internship_name,
         company: this.data.data.company_name,
         company_email: this.data.data.company_email,
         registration_number: this.data.data.registration_number,
         institution: this.data.data.institution,
         town_city: this.data.data.town_city,
         no_of_internship: this.data.data.number_of_positions,
         email: this.data.data.email,
         closing_date: this.data.data.closing_date,
         pdf_file: this.data.data.pdf_file

       });
       //getting the h1 element
      //  this.document.getElementById('header')!.innerText = `Send ${this.data.data.internship_name}'s positions`;
 
 
     } 
 
     // const user = JSON.parse(localStorage.getItem('userdata'));
 
     this.getAvailableInternships();
     this. getInternshipNames();
 
 
     this.allpositions =  this.internshipsService.getAllavailableInternships();
  }

  get f() { return this.new_internshipsForm?.controls }


  getAvailableInternships() {
    this.internshipsService.getAllavailableInternships()
      .subscribe((result: any) => {


        // const data = JSON.parse(localStorage.getItem('userdata'));

        result.availableInternship.forEach((val: any) => 
          // this.number = result.Total_availablenternship;
          // this.data = data.availableInternship;
          this.Internships.push(val as never));
 

        // this.spinner.hide();
      });
  }


  getInternshipNames() {
    this.internshipsService.getAllInternshipNames()
      .subscribe((result: any) => {


        const data = JSON.parse(localStorage.getItem('userdata') || '{}');

        result.internshipName.forEach((data: { internshipName: any; }) => {
          // this.number = result.Total_availablenternship;
          this.data = data.internshipName;
          this.InternshipsName.push(data as never);
  
        });

        // this.spinner.hide();
      });
  }


  
  setInstitutions(){
    this.internshipsService.getAllavailableInternships()
    .subscribe((result: any) => {


      const data = JSON.parse(localStorage.getItem('userdata') || '{}');

      result.availableInternship.forEach((data: any) => {
        // this.number = result.Total_availablenternship;
        this.data = data.availableInternship;
        this.Internships.push(data as never);




        this.intern = this.new_internshipsForm.value.internships_name;

        // for (let i = 0; i <  this.Internships.push[data].length; i++) {
        //   if (this.intern === this.Internships.push[data].internship_name) {
    
        //     this.new_internshipsForm.patchValue({
        //       no_of_internship: this.Internships.push[(data].number_of_positions 
    
        //     });
    
    
        //     // putting the length of the country code in the local storage
        //     localStorage.setItem('c_codelength', JSON.stringify({ value: this.new_internshipsForm.value.institution.length }));
        //   }
        // }
      });

      // this.spinner.hide();
    });
 
  }


  setInstitutionsEmail() {
    this.iname = this.new_internshipsForm.value.institution;

    for (let i = 0; i < this.institution_list.length; i++) {
      if (this.iname === this.institution_list[i].INSTITUIONNAME) {

        this.new_internshipsForm.patchValue({
          email: this.institution_list[i].EMAILAD

        });


        // putting the length of the country code in the local storage
        localStorage.setItem('c_codelength', JSON.stringify({ value: this.new_internshipsForm.value.email.length }));
      }
    }
  }



  submitNewInternships(){
  
    this.submitted = true;


    let emailaddress: any;
    let iname: any;


  if (!this.new_internshipsForm.value.email) {
   emailaddress = this.emailaddress;
  } else {
   emailaddress = this.new_internshipsForm.value.email;
  }

  if (this.new_internshipsForm.value.institution) {
   iname = this.new_internshipsForm.value.institution;
  }
  

    if (this.new_internshipsForm.invalid) {
      return false;
  

    } 




      const internships = {
        internships_name: this.new_internshipsForm.value.internships_name,
        company: this.new_internshipsForm.value.company,
        town_city: this.new_internshipsForm.value.town_city,
        registration_number: this.new_internshipsForm.value.registration_number,
        institution: this.new_internshipsForm.value.institution,
        email: this.new_internshipsForm.value.email,
        no_of_internship: this.new_internshipsForm.value.no_of_internship,
         closing_date: this.new_internshipsForm.value.closing_date,
        company_email: this.new_internshipsForm.value.company_email,
        pdf_file: this.new_internshipsForm.value.pdf_file

       
       
      };

  
      this.internshipsService.sendNewInternships(internships).subscribe(
      
        (        data: { success: any; }) => {


          if (data.success) {
            // this.showtoast = true;
            // this.valid = true;
           
            this.loading = true;
            this.btnWait = true;
           
            this.showtoast = true;
               

                 // email data
                 const userdata = {
                  email: this.new_internshipsForm.value.email,
                  message: ` ${this.new_internshipsForm.value.institution} 
                  Good day sir/madam.
                  Find the availabe internship post for your institution and send the qualified student for the position:
                   ${this.new_internshipsForm.value.internships_name} and there are ${this.new_internshipsForm.value.no_of_internship} position(s).`,
                };

                     // sending email to the user
            this.internshipsService.sendEmailPlain(userdata).subscribe();

            
        
              // this.new_internshipsForm.reset();
              setTimeout(() => {
                this.router.navigate(['/internships']);
              }, 3000);
  
            // }, 3000);
          } else {
            console.log('error');
          }
        }
      );     

}



ngOnDestroy(): void {
  //removing the data from the localstorage
  localStorage.removeItem('INTERNSHIPdata');
}
}
