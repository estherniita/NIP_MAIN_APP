import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AdminAuthenticationService} from '../../services/admin-authentication.service';
import $ from 'jquery';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {



 public popoverTitle: string = 'Admin Deletion';
 public popoverMessage: string = 'Do you really want to delete this user?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  deleteModal() {
    ($("#deleteModal")as any).modal('toggle');
  }


  public Admins = [];
  id?: string;
  admin: any;
  username: any;
  search: any;
  data: any;
  admins: string[] = [];
  showAlert?: boolean;
  organization_admins: any[] = [];

  constructor(private router: Router,public adminAuthenticationService: AdminAuthenticationService, private modal: NgbModal,) { }

  ngOnInit(): void {

    document.title = "User management: National Internship Program";
    this.getAdmins();
    this.getAllRegisteredOrganization();

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

  getAllRegisteredOrganization() {
    this.adminAuthenticationService.getAllRegisteredOrganization()
      .subscribe((result:any) => {
        // this.Users.push(result);
        result.data.forEach((val:any) => this.organization_admins.push(val));
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
  deleteAdmin(data: { id: any; }, i: number) {
    this.admins.splice(i, 1);
    this.adminAuthenticationService.deleteAdmin(data.id)
      .subscribe((data: any) => {
        if (data.success) {
          this.showAlert = true;
          this.admins.splice( i, 1);
        }
      });
  
  }


    //method to delete admin record details
    deleteOrganization(data: { id: any; }, i: number) {
      this.organization_admins.splice(i, 1);
      this.adminAuthenticationService.deleteOrganization(data.id)
        .subscribe((data: any) => {
          if (data.success) {
            this.showAlert = true;
            this.organization_admins.splice( i, 1);
          }
        });
    
    }

}
