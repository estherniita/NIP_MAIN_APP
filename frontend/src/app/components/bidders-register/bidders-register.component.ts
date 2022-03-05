import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { PasswordMatch } from 'src/app/validators/password-match.validator';
// import { BackendResponse } from 'src/app/shared/interfaces';
import { interval, Observable, Subscription, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-bidders-register',
  templateUrl: './bidders-register.component.html',
  styleUrls: ['./bidders-register.component.scss']
})
export class BiddersRegisterComponent implements OnInit {

  registerForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    // phone: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('[- +()0-9]+')]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8) ]),
    confirmPassword: new FormControl('', [Validators.required]),
  },
  );

  errorMessage: Subject<string> = new Subject();
  waiting: boolean = false;
  active: boolean = false;


  constructor(private router: Router, private auth: UserAuthService, private formBuilder: FormBuilder) {
    // this.registerForm = this.formBuilder.group (
    //   {
    //     validator: PasswordMatch('password', 'confirmPassword')
    //   }
    // )
  }

  ngOnInit(): void {
    document.title = "Sign up: Bidders Portal"
  }

  async signUp(event: Event) {
    event.preventDefault();

    this.waiting = true;

    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;

    //creating a user object
    const user = {
     fname: this.registerForm.value.fname,
     lname: this.registerForm.value.lname,
     username: this.registerForm.value.username,
     email: this.registerForm.value.email,
     password: this.registerForm.value.password,
     active: this.active

    }

    if (password === confirmPassword) {
        //check if the email already exist in the database
        this.auth.getEmail(this.registerForm.value.email).subscribe((data: any) => {
          if ( data.match && data.success ) {
            setTimeout(() => {
              this.waiting = false;
            }, 300);
            this.errorMessage.next("Error: Account already exist, try resetting your password." )
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


                this.sendUserData(data.message);

                //setting the user data in the
                // localStorage.setItem('user', JSON.stringify(user));

                this.ngOnInit()
                setTimeout(() => {
                  this.waiting = false;
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

  redirectToSignIn() {
    this.router.navigate(['/auth/signin']);
  }

  sendUserData(message: string) {
    this.auth.nextUserMessage(message);
  }

}
