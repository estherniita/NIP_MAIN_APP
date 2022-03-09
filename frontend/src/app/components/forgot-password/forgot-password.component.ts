import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/shared/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { BackendResponse } from 'src/app/shared/interfaces';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

emailForm = new FormGroup({
   email: new FormControl('', [Validators.required, Validators.email])
  });
  errorMessage: Subject<string> = new Subject()


  constructor() { }

  ngOnInit(): void {
  }

  async sendEmail() {

  }

}
