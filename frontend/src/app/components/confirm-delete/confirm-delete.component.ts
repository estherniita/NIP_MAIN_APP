import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UsersService} from '../../services/users.service'
import {AdminAuthenticationService} from '../../services/admin-authentication.service';


@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  user: any;
  userdata:any;

  constructor(public activeModal: NgbActiveModal, public adminAuthenticationService: AdminAuthenticationService, private usersService: UsersService) { }

  ngOnInit(): void {
  }

  delete() {

    this.userdata = JSON.parse(localStorage.getItem('userId') || '{}');

    //deleting the user from the database
    if (this.userdata) {
      this.adminAuthenticationService.deleteAdmin(this.userdata.user.id)
        .subscribe((data: any) => {
          if (data.success) {
            // this.showAlert = true;
            localStorage.removeItem('userId');
            this.activeModal.dismiss();
          }
        });
    }
  }


}
