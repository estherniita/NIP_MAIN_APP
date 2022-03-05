import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  fieldTextType?: boolean;
  submitted: boolean = false;
  successMsg?: string;
  errorMsg: any;
  loading = false;
  public loadingMsg = 'Authenticating...Please wait';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
    document.title = "Sign in: Admin"
  }

   //get form controls
   get f() {
    return this.loginForm.controls;
  }

  //Toggle show password
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  login() {

  }

}
