import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SuperadminAuthGuardService {

  constructor(
    private auth: UsersService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    if (!this.auth.isUserOrAdminAuthenticated()) {
      this.router.navigate(["/?"]);
      // setTimeout(() => {
      //   this.modal.open(LoginComponent, {});
      // }, 2000);
      return false;
    }
    return true;
  }
}
