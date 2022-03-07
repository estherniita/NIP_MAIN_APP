import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { Subject } from 'rxjs';
import { MustMatch } from '../../components/mustMatch.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  //creating a form group
  registerForm = new FormGroup({
    organization_name: new FormControl('', [Validators.required]),
    registration_number: new FormControl('', [Validators.required, Validators.minLength(6)]),
    contact_number: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('[- +()0-9]+')]),
    physical_address: new FormControl('', [Validators.required]),
    email: new FormControl('',  [Validators.email, Validators.required, Validators.pattern('^[a-z0-9A-Z._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/\d/), Validators.pattern(/[A-Z]/)]),
    confirmPassword: new FormControl('', [Validators.required]),
    contact_person_fullname: new FormControl('', [Validators.required]),
    role: new FormControl('', ),

  },

  );

  errorMessage: Subject<string> = new Subject();
  waiting: boolean = false;
  active: boolean = false;

  constructor(private router: Router, private auth: UserAuthService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    document.title = "Sign up: Organization National Internship Program"
  }

  redirectToSignIn() {

    this.router.navigate(['/auth/signin']);
  }


  //function for signing up 
  async signUp(event: Event) {
    event.preventDefault();

    this.waiting = true;

    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;

    //creating a user object
    const user = {

    organization_name: this.registerForm.value.organization_name,
    registration_number: this.registerForm.value.registration_number,
    contact_number: this.registerForm.value.contact_number,
    physical_address: this.registerForm.value.physical_address,
    email: this.registerForm.value.email,
    password: this.registerForm.value.password,
    contact_person_fullname: this.registerForm.value.contact_person_fullname,
    role:  'organization'

    }

    console.log('user data', user)

    if (password === confirmPassword) {
      //check if the email already exist in the database
      this.auth.getEmail(this.registerForm.value.email).subscribe((data: any) => {
        if ( data.match && data.success ) {
          setTimeout(() => {
            this.waiting = false;
          }, 300);
          this.errorMessage.next("Error: Account already exist, with that email address. Try resetting your password." )
        } else
        {
          //proceeding to register the user in case the email doesn't exist
          this.auth.registerUser(user).subscribe((data: any) => {
            if (data.success) {
              let user = {
                user: data.user,
                token: data.token,
                isLoggedin: false
              };

              console.log('Message information', data.message);

              this.sendUserData(data.message);

              //setting the user data in the
              // localStorage.setItem('user', JSON.stringify(user));
              this.errorMessage.next("Company registered successfully." )

              this.ngOnInit()
              setTimeout(() => {
                this.waiting = false;
                console.log("Doneeee");
                this.router.navigate(['/auth/signup-success']);

              }, 3000);
             }
          })
        }
      })

  } else {
    this.errorMessage.next("Passwords do not match");
  }
  }

  sendUserData(message: string) {
    this.auth.nextUserMessage(message);
  }

}
