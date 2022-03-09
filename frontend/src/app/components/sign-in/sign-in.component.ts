import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { InvisibleReCaptchaComponent, ReCaptchaV3Service } from 'ngx-captcha';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  //initializing the form group
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  institution_list = [

    { INSTITUTIONNAME: 'International University of Management (IUM)' },
    { INSTITUTIONNAME: 'Namibia University of Science and Technology (NUST)' },
    { INSTITUTIONNAME: 'Namibian  Institute  of  Mining  and  Technology (NIMT)' },
    { INSTITUTIONNAME: 'University  of Namibia (UNAM)' },
    { INSTITUTIONNAME: 'Vocation  Training  Centers(VTC) through the Namibia Training Authority (NTA)' }


  ]

  public institute_name: any;

  loading = false;
  submitted = false;
  // returnUrl: string;
  userDisplayName = '';
  isLoggedin = false;
  // error: string;
  showUError: any;
  showPwd = false;
  closeAlert = false;
  errorMessage: any;

  // errorMessage: Subject<string> = new Subject();
  waiting: Boolean = false;
  siteRecaptchaKey = '6LcPk74eAAAAALx7eJez8wDT_d3i5E7NXX5FbZnr';
  recaptcha: any = null;

  @ViewChild('captchaElem', { static: false }) captchaElem?: InvisibleReCaptchaComponent;

  constructor(
    private router: Router,
    private auth: UserAuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private service: UsersService) { }

  ngOnInit(): void {
    document.title = "Sign in: National Internship Program"
  }

  handleExecute(): void {
    // this.captchaElem?.execute();
    this.reCaptchaV3Service.execute(this.siteRecaptchaKey, 'login', (token) => {
      this.sendTokenToBackend(token);
    }, {
      useGlobalDomain: false
    });
  }

  //function for user log in
  async signIn(event?: any) {
    event?.preventDefault();

    // this.handleExecute();

    this.waiting = true;

    if (event) {
      this.sendTokenToBackend(event);
    }

    //check if the form is valid, if not it shouldn't proceed with the request
    if (this.loginForm.invalid) {

      return;
    }
    //if the form is valid
    else if (this.loginForm.valid) {
      //creating a user object

      const user = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }

      this.auth.login(user).subscribe((data: any) => {
        console.log(data)
        if (data.success) {
          setTimeout(() => {
            const user = {
              user: data.user,
              token: data.token,
              isLoggedin: true
            }

            //saving user data in local storage
            localStorage.setItem('user', JSON.stringify(user));



            // setTimeout(() => {
            // this.waiting = false;
            // this.router.navigate(['/home']);
            //   }, 400);
            //   }
            //   else if(!data.success) {
            //     console.log(data.msg);
            //     this.errorMessage.next(data.msg);
            //     setTimeout(() => {
            //       this.waiting = false;
            //         }, 400);

            //   }

            switch (data.result[0].role) {

              case 'admin': {
                const user = {
                  role: data.result[0].role,
                  user: data.result,
                  token: data.token,
                  isLoggedin: true,
                  username: data.result[0].username,
                }
                // saving the data in the local storage
                localStorage.setItem('userdata', JSON.stringify(user));
                this.router.navigate(['/admin-dashboard']);
                //this.setInterval();
                this.captchaElem?.resetCaptcha();
                this.changeDetectorRef.detectChanges();

                break;
              }

              case 'user': {
                const user = {
                  role: data.result[0].role,
                  user: data.user,
                  token: data.token,
                  isLoggedin: true,
                  username: data.result[0].username,
                }
                // saving the data in the local storage
                localStorage.setItem('userdata', JSON.stringify(user));
                this.router.navigate(['/home']);
                //this.setInterval();
                this.captchaElem?.resetCaptcha();
                this.changeDetectorRef.detectChanges();

                break;

              }


              case 'adminIUM': {
                const user = {
                  role: data.result[0].role,
                  user: data.user,
                  token: data.token,
                  isLoggedin: true,
                  username: data.result[0].username,
                }
                // saving the data in the local storage
                localStorage.setItem('userdata', JSON.stringify(user));
                this.router.navigate(['/institutionDashboard']);
                //this.setInterval();
                this.captchaElem?.resetCaptcha();
                this.changeDetectorRef.detectChanges();

                break;

              }

              case 'adminNUST': {
                const user = {
                  role: data.result[0].role,
                  user: data.user,
                  token: data.token,
                  isLoggedin: true,
                  username: data.result,
                }
                // saving the data in the local storage
                localStorage.setItem('userdata', JSON.stringify(user));
                this.router.navigate(['/institutionDashboard']);
                //this.setInterval();
                this.captchaElem?.resetCaptcha();
                this.changeDetectorRef.detectChanges();

                break;

              }


              case 'adminNIMT': {
                const user = {
                  role: data.result[0].role,
                  user: data.user,
                  token: data.token,
                  isLoggedin: true,
                }
                // saving the data in the local storage
                localStorage.setItem('userdata', JSON.stringify(user));
                this.router.navigate(['/institutionDashboard']);
                //this.setInterval();
                this.captchaElem?.resetCaptcha();
                this.changeDetectorRef.detectChanges();

                break;

              }

              case 'adminUNAM': {
                const user = {
                  role: data.result[0].role,
                  user: data.user,
                  token: data.token,
                  isLoggedin: true,
                }
                // saving the data in the local storage
                localStorage.setItem('userdata', JSON.stringify(user));
                this.router.navigate(['/institutionDashboard']);
                //this.setInterval();
                this.captchaElem?.resetCaptcha();
                this.changeDetectorRef.detectChanges();

                break;

              }

              case 'adminVTC': {
                const user = {
                  role: data.result[0].role,
                  user: data.user,
                  token: data.token,
                  isLoggedin: true,
                }
                // saving the data in the local storage
                localStorage.setItem('userdata', JSON.stringify(user));
                this.router.navigate(['/institutionDashboard']);
                //this.setInterval();

                break;

              }


              case 'adminCompany': {
                const user = {
                  role: data.result[0].role,
                  user: data.user,
                  token: data.token,
                  isLoggedin: true,
                }
                // saving the data in the local storage
                localStorage.setItem('userdata', JSON.stringify(user));
                this.router.navigate(['/companies']);
                //this.setInterval();

                break;

              }

              case 'organization': {
                const user = {
                  role: data.result[0].role,
                  user: data.user,
                  token: data.token,
                  isLoggedin: true,
                  username: data.result[0].username,
                  contact_person_fullname: data.result[0].contact_person_fullname,
                  contact_number: data.result[0].contact_number,
                  registration_number: data.result[0].registration_number,
                  organization_name: data.result[0].organization_name,
                  email: data.result[0].email,
                }
                // saving the data in the local storage
                localStorage.setItem('userdata', JSON.stringify(user));

                this.router.navigate(['/companies']);
                //this.setInterval();

                break;


              }
            }

          });

        }

        else {
          if (data.message === 'Username does not exits') {
            this.showUError = 'Authentication failed. You entered an incorrect username or password';
            setTimeout(() => {
              this.showUError = null;
              // this.router.navigate(['/login']);
            }, 10000);
            this.waiting = false;

            this.showPwd = true;
            setTimeout(() => {
              this.closeAlert = true;
              this.showPwd = false;
            }, 10000);
          } else if (data.message === 'Incorrect password') {
            this.showUError = 'Authentication failed. You entered an incorrect username or password';
            this.waiting = false;
            setTimeout(() => {
              this.showUError = null;
              // this.router.navigate(['/login']);
            }, 10000);
          }
        }
      });
    }

  }


  // function to resolve the reCaptcha and retrieve a token
  async resolved(captchaResponse: string, res: any) {
    console.log(`Resolved response token: ${captchaResponse}`);
    await this.sendTokenToBackend(captchaResponse); // declaring the token send function with a token parameter

  }

  // function to send the token to the node server
  sendTokenToBackend(captchaResponse: any) {
    // calling the service and passing the token to the service

    this.service.sendToken(captchaResponse).subscribe(
      (data: any) => {
        // console.log(data);
      },
      (err: any) => {
        console.log(err);
      },
      () => { }
    );
  }

  redirectToSignUp() {
    this.router.navigate(['/auth/signup']);
  }

}
