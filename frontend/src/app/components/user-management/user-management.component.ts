import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import {ConfirmDeleteComponent} from  '../confirm-delete/confirm-delete.component';
import {AdminAuthenticationService} from '../../services/admin-authentication.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public Admins = [];
  id?: string;
  admin: any;
  username: any;
  search: any;
  data: any;
  admins: string[] = [];
  showAlert?: boolean;

  constructor(private router: Router,public adminAuthenticationService: AdminAuthenticationService) { }

  ngOnInit(): void {

    document.title = "User management: National Internship Program";
    this.getAdmins();

  }

  addAdmin() {

    const datatosave = {
      addAdmin: true,
    }

    //saving data in the local storage
    localStorage.setItem('ADMINdata', JSON.stringify(datatosave));

    this.router.navigate(['/registerAdmin'])
  }

  getAdmins() {
    this.adminAuthenticationService.getAllAdmins()
      .subscribe((result:any) => {
        // this.Users.push(result);
        result.data.forEach((val:any) => this.admins.push(val));
      });
  }

  editRecord(data: any) {


    const datatosave = {
      updateAdmin: true,
      data
    }

    //saving data in the local storage
    localStorage.setItem('ADMINdata', JSON.stringify(datatosave));

    //routing the admin to the registration component
    setTimeout(() => {
      this.router.navigate(['/registerAdmin']);
    }, 500);
  }

  //method to delete admin record details
  deleteAdmin(data: any, i: any) {
    this.admins.splice(i, 1);
    this.adminAuthenticationService.deleteAdmin(data.id)
      .subscribe((data: any) => {
        if (data.success) {
          // this.showAlert = true;
          this.admins.splice(i, 1);
          // this.modal.open(ConfirmDeleteComponent, { centered: true });
        }
      });
  
  }

}
