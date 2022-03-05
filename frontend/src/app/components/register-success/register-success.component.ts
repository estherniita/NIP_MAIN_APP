import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.scss']
})
export class RegisterSuccessComponent implements OnInit {

  message?: {};

  constructor(private auth: UserAuthService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    //Shared message
    this.auth.sharedMessage.subscribe(data => {
      this.message = data

      //this.message ="This message"

      let _message_check = Object.keys(this.message).length === 0 && this.message.constructor === Object;

      if (_message_check ){
        this.router.navigate(['/auth/signin'])
      }else{
        return true;
      }

    })
  }

  redirectToSignIn() {
    this.router.navigate(['/auth/signin']);
  }

}
