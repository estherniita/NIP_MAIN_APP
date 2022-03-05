import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-bidders-login',
  templateUrl: './bidders-login.component.html',
  styleUrls: ['./bidders-login.component.scss']
})
export class BiddersLoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage: Subject<string> = new Subject();
  waiting: Boolean = false;

  constructor(private router: Router, private auth: UserAuthService) { }

  ngOnInit(): void {
    document.title = "Sign in: Bidders Portal"
  }

  //function for user log in
  async signIn(event: Event) {
    event.preventDefault();

    this.waiting = true;

//check if the form is valid, if not it shouldn't proceed with the request
    if (this.loginForm.invalid) {

      return;
    }
    //if the form is valid
    else if (this.loginForm.valid){
      //creating a user object

      const user = {
        username: this.loginForm.value.email,
        password: this.loginForm.value.password
      }

    this.auth.login(user).subscribe( (data: any) => {

      if (data.success) {
        const user = {
        user: data.user,
        token: data.token,
        isLoggedin: true
      }

      //saving user data in local storage
      localStorage.setItem('user', JSON.stringify(user));

      setTimeout(() => {
      this.waiting = false;
      this.router.navigate(['/home']);
        }, 400);
        }
        else if(!data.success) {
          this.errorMessage.next(data.msg);
          setTimeout(() => {
            this.waiting = false;
              }, 400);

        }


    })
    }


  }

  redirectToSignUp() {
    this.router.navigate(['/auth/signup']);
  }

}
