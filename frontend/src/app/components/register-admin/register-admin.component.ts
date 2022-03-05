import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MustMatch } from '../../components/mustMatch.validator';
import { UsersService } from '../../services/users.service';
import { DOCUMENT } from '@angular/common';
import {AdminAuthenticationService} from '../../services/admin-authentication.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent implements OnInit {

  adminForm = new FormGroup(
    {
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required]),
      institution_company: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),

    },
  
  );


  institution_list = [
    { INSTITUIONNAME: 'MTC super user', ROLE: 'admin' },
    { INSTITUIONNAME: 'International University of Management (IUM)', ROLE: 'adminIUM' },
    { INSTITUIONNAME: 'Namibia University of Science and Technology (NUST)', ROLE: 'adminNUST' },
    { INSTITUIONNAME: 'Namibia Institute of Mining and Technology (NIMT)', ROLE: 'adminNIMT' },
    { INSTITUIONNAME: 'University of Namibia (UNAM)', ROLE: 'adminUNAM' },
    { INSTITUIONNAME: 'Vocational Training Centres (VTC) through the Namibia Training Authority (NTA)', ROLE: 'adminVTC' },
    { INSTITUIONNAME: 'Company', ROLE: 'adminCompany' },

  ]

  btnWait: Boolean = false;

  loading: Boolean = false;
  errorMessage: Subject<string> = new Subject();
  waiting: boolean = false;
  active: boolean = false;

  emailaddress: any;
  role: any;
  no_of_internship: any;
  public iname: any;
  public  intern: any;

  // adminForm!: FormGroup;
  public submitted = false;
  public showtoast?: boolean;
  public data: any;
  public showtoast2?: boolean;
  public reg_admin: boolean = false;
  public changepwd: boolean = false;
  public inner_value: any = 'Change password';
  public admintext?: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    public adminAuthenticationService: AdminAuthenticationService,
    @Inject(DOCUMENT) private document: Document,) { }

  ngOnInit(): void {
    //gettign the data from the localstroage
    this.data = JSON.parse(localStorage.getItem('ADMINdata')!)

    if (this.data === undefined ||  this.data === null) {
      this.router.navigate(['/user-management'])
    } else if (this.data.updateAdmin) {
      //creating the form and making the values not required
      // this.adminForm = this.formBuilder.group(
      //   {
      //     firstname: [""], 
      //     lastname: [""],    
      //     email: [""],
      //     role: [""],
      //     institution_company: [""],
      //     username: [""],
      //     password: [""],
      //     confirmPassword: [""]
      //   }

      // );

      this.adminForm.patchValue({
        firstname: this.data.data.firstname,
        lastname: this.data.data.lastname,
        email: this.data.data.email,
        role: this.data.data.role,
        institution_company: this.data.data.institution_company,
        username: this.data.data.username
      });
      //getting the h1 element
      // this.document.getElementById('header')!.innerText = `Edit ${this.data.data.username}'s information`;

      this.admintext = 'Update Details';


    }  else if (this.data.addAdmin) {
      //craating the form and making the value required
     

      this.admintext = 'Add admin';

    } 
  }

  changePwdToggle() {

    this.changepwd = !this.changepwd;

    this.inner_value = this.changepwd ? 'Hide section' : 'Change password';

    if (this.changepwd) {
      this.adminForm?.get('password')?.setValidators([Validators.required]);
      this.adminForm?.get('confirmPassword')?.setValidators([Validators.required]);
      // this.adminForm. ({
      //   validator: MustMatch("password", "confirmPassword")
      // })
    } else {
      // removing the validators
      this.adminForm?.get('password')?.clearValidators();
      this.adminForm?.get('confirmPassword')?.clearValidators();
    }
  }

  get f() {
    return this.adminForm?.controls;
  }

  setRoles() {
    this.iname = this.adminForm.value.institution_company;

    for (let i = 0; i < this.institution_list.length; i++) {
      if (this.iname === this.institution_list[i].INSTITUIONNAME) {
        console.log(this.iname);

        this.adminForm.patchValue({
          role: this.institution_list[i].ROLE

        });
        console.log(this.role);


        // putting the length of the country code in the local storage
        localStorage.setItem('c_codelength', JSON.stringify({ value: this.adminForm.value.role.length }));
      }
    }
  }

 
    register() {
  
      this.waiting = true;
  
      const password = this.adminForm.value.password;
      const confirmPassword = this.adminForm.value.confirmPassword;
      
    
      this.submitted = true;
    console.log('register',)

    if (this.adminForm?.invalid) {
      return false;
    } else if (this.data.updateAdmin) {
      // making sure the passwords match so that, we put an assumptions that the user has entered a password to be updated
      let withpwdVal: boolean = false;

      if (this.adminForm?.value.confirmPassword !== '' && this.adminForm?.value.password !== '') {
        if (this.adminForm?.value.confirmPassword === this.adminForm?.value.password) {
          withpwdVal = true;
        }
      }

      const user = {
        firstname: this.adminForm?.value.firstname,
        lastname: this.adminForm?.value.lastname,
        email: this.adminForm?.value.email,
        role: this.adminForm?.value.role,
        institution_company: this.adminForm?.value.institution_company,
        username: this.adminForm?.value.username,
        password: this.adminForm?.value.password,
        withpwd: withpwdVal
      };
      
      console.log('register', user)


      this.adminAuthenticationService.updateAdmin(this.data.data.id, user).subscribe((data: any) => {

        console.log(this.data.data.id);

        if (data.success) {

          this.loading = true;
          this.btnWait = true;

          this.showtoast2 = true;
          
          setTimeout(() => {
            this.router.navigate(['/usermanagement']);
          }, 3000);
        } else {
          // console.log(data);
        }
      },
       
      );


    } else if (this.data.addAdmin) {
       
      const user = {
        firstname: this.adminForm?.value.firstname,
        lastname: this.adminForm?.value.lastname,
        email: this.adminForm?.value.email,
        role: this.adminForm?.value.role,
        institution_company: this.adminForm?.value.institution_company,
        username: this.adminForm?.value.username,
        password: this.adminForm?.value.password
       
      };

      // this.loading = true;

      if (password === confirmPassword) {

      this.adminAuthenticationService.registerAdmin(user).subscribe(
        (data: any) => {
          if (data.success) {

            this.loading = true;
            this.btnWait = true;
            
            this.showtoast = true;
            setTimeout(() => {
              this.router.navigate(['/usermanagement']);

            }, 3000);
          } else {
            // console.log(data);
          }
        },
      
      );
    } 

    else {
      this.errorMessage.next("Passwords do not match");
    }
    }
  
    // sendUserData(message: string) {
    //   this.auth.nextUserMessage(message);
    // }
  

  }


  ngOnDestroy(): void {
    //removing the data from the localstorage
    localStorage.removeItem('ADMINdata');
  }

  // method to go back to the previous page
  gotBack() {
    if (this.data.addAdmin || this.data.updateAdmin) { this.router.navigate(['/admin-management']); }
    else { this.router.navigate(['/user-management']) }
  }

}
