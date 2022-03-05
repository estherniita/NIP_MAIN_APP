import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/shared/auth.service';
import { FormControl, Validators } from '@angular/forms';
// import { BackendResponse } from 'src/app/shared/interfaces';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-bidders-forgot-password',
  templateUrl: './bidders-forgot-password.component.html',
  styleUrls: ['./bidders-forgot-password.component.scss']
})
export class BiddersForgotPasswordComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage: Subject<string> = new Subject()


  constructor() { }

  ngOnInit(): void {
  }

  async sendEmail() {

  }

}
